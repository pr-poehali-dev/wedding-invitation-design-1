import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Icon from "@/components/ui/icon";

interface WeddingResponse {
  id: number;
  name: string;
  attending: 'yes' | 'no';
  alcohol_preference: 'champagne' | 'wine' | 'vodka' | null;
  message: string | null;
  created_at: string;
}

interface Statistics {
  total: number;
  attending: number;
  not_attending: number;
  alcohol_preferences: Record<string, number>;
}

export default function WeddingAdmin() {
  const [responses, setResponses] = useState<WeddingResponse[]>([]);
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [attendingFilter, setAttendingFilter] = useState<string>('all');
  const [alcoholFilter, setAlcoholFilter] = useState<string>('all');

  const fetchResponses = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (attendingFilter !== 'all') params.append('attending', attendingFilter);
      if (alcoholFilter !== 'all') params.append('alcohol', alcoholFilter);
      
      const url = `https://functions.poehali.dev/c792ee0f-442a-4c1f-aac5-38b33ef16cb3${params.toString() ? '?' + params.toString() : ''}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (response.ok) {
        setResponses(data.responses || []);
        setStatistics(data.statistics || null);
      } else {
        console.error('Error fetching responses:', data.error);
      }
    } catch (error) {
      console.error('Error fetching responses:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResponses();
  }, [attendingFilter, alcoholFilter]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getAttendingBadge = (attending: string) => {
    return attending === 'yes' ? (
      <Badge className="bg-green-100 text-green-800">Придет</Badge>
    ) : (
      <Badge className="bg-red-100 text-red-800">Не придет</Badge>
    );
  };

  const getAlcoholIcon = (preference: string | null) => {
    switch (preference) {
      case 'champagne': return '🥂';
      case 'wine': return '🍷';
      case 'vodka': return '🍺';
      default: return '❓';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader2" size={32} className="animate-spin text-autumn-orange mx-auto mb-4" />
          <p className="text-muted-foreground">Загружаем ответы гостей...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-cormorant text-4xl font-bold text-autumn-brown mb-2">
            Ответы гостей на свадьбу
          </h1>
          <p className="text-muted-foreground">
            Административная панель для просмотра всех ответов
          </p>
        </div>

        {/* Statistics */}
        {statistics && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-autumn-brown">{statistics.total}</div>
                <div className="text-sm text-muted-foreground">Всего ответов</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{statistics.attending}</div>
                <div className="text-sm text-muted-foreground">Придут</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600">{statistics.not_attending}</div>
                <div className="text-sm text-muted-foreground">Не придут</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-lg font-bold text-autumn-orange">
                  {Object.entries(statistics.alcohol_preferences).map(([type, count]) => (
                    <div key={type} className="text-sm">
                      {getAlcoholIcon(type)} {count}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">Предпочтения</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div>
            <label className="text-sm font-medium text-autumn-brown mb-2 block">
              Статус присутствия
            </label>
            <Select value={attendingFilter} onValueChange={setAttendingFilter}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все ответы</SelectItem>
                <SelectItem value="yes">Придут</SelectItem>
                <SelectItem value="no">Не придут</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium text-autumn-brown mb-2 block">
              Предпочтения по алкоголю
            </label>
            <Select value={alcoholFilter} onValueChange={setAlcoholFilter}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все предпочтения</SelectItem>
                <SelectItem value="champagne">🥂 Шампанское</SelectItem>
                <SelectItem value="wine">🍷 Вино</SelectItem>
                <SelectItem value="vodka">🍺 Водка</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <Button 
              onClick={fetchResponses}
              className="bg-autumn-orange hover:bg-autumn-orange/90"
            >
              <Icon name="RefreshCw" size={16} className="mr-2" />
              Обновить
            </Button>
          </div>
        </div>

        {/* Responses List */}
        <div className="space-y-4">
          {responses.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Пока нет ответов от гостей
                </p>
              </CardContent>
            </Card>
          ) : (
            responses.map((response) => (
              <Card key={response.id} className="border-autumn-gold/30">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-autumn-brown">{response.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      {getAttendingBadge(response.attending)}
                      {response.alcohol_preference && (
                        <Badge variant="outline">
                          {getAlcoholIcon(response.alcohol_preference)}
                          {response.alcohol_preference === 'champagne' ? 'Шампанское' :
                           response.alcohol_preference === 'wine' ? 'Вино' : 'Водка'}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Ответил: {formatDate(response.created_at)}
                  </div>
                </CardHeader>
                {response.message && (
                  <CardContent>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-sm italic">"{response.message}"</p>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}