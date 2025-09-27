import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import { useState } from "react";

export default function WeddingInvitation() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attending: '',
    guests: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('RSVP submitted:', formData);
    // Here you would typically send the data to a backend
    alert('Спасибо за подтверждение! Мы получили ваш ответ.');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-b from-autumn-cream to-background">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: 'url(/img/f74274fd-00bf-4022-9087-c9fc942f0844.jpg)' }}
        />
        <div className="relative text-center px-4 max-w-4xl">
          <div className="mb-8">
            <Icon name="Leaf" size={48} className="text-autumn-orange mx-auto mb-4" />
          </div>
          <h1 className="font-cormorant text-6xl md:text-8xl font-bold text-autumn-brown mb-6">
            Игорь & Валерия
          </h1>
          <p className="text-2xl md:text-3xl font-cormorant text-autumn-slate mb-8">
            Приглашают на свою свадьбу
          </p>
          <div className="flex items-center justify-center gap-4 text-autumn-orange">
            <Icon name="Calendar" size={24} />
            <span className="text-xl font-sans">1 ноября 2025</span>
          </div>
        </div>
      </section>

      {/* Welcome Message */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-cormorant text-4xl md:text-5xl font-bold text-autumn-brown mb-8">
            Дорогие друзья!
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Мы с радостью приглашаем вас разделить с нами один из самых важных дней в нашей жизни. 
            Ваше присутствие сделает наш праздник по-настоящему особенным и незабываемым.
            Давайте вместе отпразднуем любовь в уютной деревенской атмосфере!
          </p>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-16 px-4 bg-card">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-cormorant text-4xl md:text-5xl font-bold text-center text-autumn-brown mb-12">
            Детали торжества
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Ceremony */}
            <Card className="border-autumn-gold/30">
              <CardHeader className="text-center pb-4">
                <Icon name="Church" size={32} className="text-autumn-orange mx-auto mb-2" />
                <h3 className="font-cormorant text-2xl font-bold text-autumn-brown">
                  Церемония
                </h3>
              </CardHeader>
              <CardContent className="text-center space-y-3">
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <Icon name="Clock" size={18} />
                  <span>14:00</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <Icon name="MapPin" size={18} />
                  <span>ЗАГС Верещагинского района</span>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  п. Зюкайка, ул. Пугачёва, д. 42/12
                </p>
              </CardContent>
            </Card>

            {/* Reception */}
            <Card className="border-autumn-gold/30">
              <CardHeader className="text-center pb-4">
                <Icon name="PartyPopper" size={32} className="text-autumn-orange mx-auto mb-2" />
                <h3 className="font-cormorant text-2xl font-bold text-autumn-brown">
                  Банкет
                </h3>
              </CardHeader>
              <CardContent className="text-center space-y-3">
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <Icon name="Clock" size={18} />
                  <span>16:00</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <Icon name="MapPin" size={18} />
                  <span>Банкетный зал "Зюкайка"</span>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  п. Зюкайка, ул. Пугачёва, д. 42/12
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Dress Code */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-cormorant text-4xl font-bold text-autumn-brown mb-8">
            Дресс-код
          </h2>
          <div className="bg-card p-8 rounded-lg border border-autumn-gold/30">
            <Icon name="Shirt" size={32} className="text-autumn-orange mx-auto mb-4" />
            <p className="text-lg text-muted-foreground">
              Просим вас выбрать наряды в осенней цветовой гамме: 
              <span className="font-semibold text-autumn-brown"> терракотовый, золотистый, коричневый, кремовый</span>.
              Приветствуется деревенский стиль — натуральные ткани и уютные фасоны.
            </p>
          </div>
        </div>
      </section>

      {/* RSVP Form */}
      <section className="py-16 px-4 bg-card">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-cormorant text-4xl font-bold text-center text-autumn-brown mb-8">
            Подтверждение присутствия
          </h2>
          <Card className="border-autumn-gold/30">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-autumn-brown font-semibold">
                    Ваше имя *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="mt-2"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-autumn-brown font-semibold">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label className="text-autumn-brown font-semibold">
                    Сможете ли вы присутствовать? *
                  </Label>
                  <div className="mt-2 space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="attending"
                        value="yes"
                        onChange={(e) => handleInputChange('attending', e.target.value)}
                        className="mr-2"
                        required
                      />
                      <span>Да, с удовольствием приду!</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="attending"
                        value="no"
                        onChange={(e) => handleInputChange('attending', e.target.value)}
                        className="mr-2"
                        required
                      />
                      <span>К сожалению, не смогу</span>
                    </label>
                  </div>
                </div>

                <div>
                  <Label htmlFor="guests" className="text-autumn-brown font-semibold">
                    Количество гостей (включая вас)
                  </Label>
                  <Input
                    id="guests"
                    type="number"
                    min="1"
                    max="4"
                    value={formData.guests}
                    onChange={(e) => handleInputChange('guests', e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-autumn-brown font-semibold">
                    Пожелания или комментарии
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="mt-2"
                    rows={3}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-autumn-orange hover:bg-autumn-orange/90 text-white font-semibold py-3"
                >
                  Отправить подтверждение
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <Icon name="Heart" size={24} className="text-autumn-orange mx-auto mb-4" />
          <p className="text-muted-foreground mb-2">
            С любовью и нетерпением ждём встречи,
          </p>
          <p className="font-cormorant text-xl text-autumn-brown">
            Игорь и Валерия
          </p>
          <div className="mt-6 flex justify-center gap-4 text-sm text-muted-foreground">
            <span>По вопросам: +7 (999) 123-45-67</span>
          </div>
        </div>
      </footer>
    </div>
  );
}