import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import { useState, useEffect } from "react";
import useScrollAnimation from "@/hooks/useScrollAnimation";

export default function WeddingInvitation() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attending: '',
    guests: '',
    message: ''
  });

  useScrollAnimation();

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
          <div className="mb-8" data-animate="scale">
            <Icon name="Leaf" size={48} className="text-autumn-orange mx-auto mb-4 animate-float" />
          </div>
          <h1 className="font-cormorant text-6xl md:text-8xl font-bold text-autumn-brown mb-6" data-animate>
            Игорь & Валерия
          </h1>
          <p className="text-2xl md:text-3xl font-cormorant text-autumn-slate mb-4" data-animate>
            Приглашают на свою свадьбу
          </p>
          <div className="flex items-center justify-center gap-6 mb-8 text-lg font-cormorant text-autumn-orange" data-animate>
            <div className="flex items-center gap-2">
              <Icon name="Cake" size={20} />
              <span>День рождения Игоря</span>
            </div>
            <div className="text-autumn-brown">•</div>
            <div className="flex items-center gap-2">
              <Icon name="Cake" size={20} />
              <span>День рождения Валерии</span>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 text-autumn-orange" data-animate="scale">
            <Icon name="Calendar" size={24} />
            <span className="text-xl font-sans">1 ноября 2025</span>
          </div>
        </div>
      </section>

      {/* Photo Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12" data-animate="scale">
            <img 
              src="https://cdn.poehali.dev/files/97ec533a-d79a-4227-aefd-f227da50f80d.jpg" 
              alt="Игорь и Валерия" 
              className="mx-auto rounded-lg shadow-xl max-w-md w-full h-auto card-hover"
            />
          </div>
          <h2 className="font-cormorant text-4xl md:text-5xl font-bold text-autumn-brown mb-8" data-animate>
            Дорогие друзья!
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto" data-animate>
            Мы с радостью приглашаем вас разделить с нами один из самых важных дней в нашей жизни! 
            В один день у нас сразу три повода для празднования - наша свадьба и дни рождения.
            Ваше присутствие сделает наш тройной праздник по-настоящему особенным и незабываемым.
            Давайте вместе отпразднуем любовь в уютной деревенской атмосфере!
          </p>
        </div>
      </section>

      {/* Childhood Photos Gallery */}
      <section className="py-16 px-4 bg-card">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-cormorant text-4xl md:text-5xl font-bold text-center text-autumn-brown mb-12" data-animate>
            Мы выросли и встретились!
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Bride's childhood photos */}
            <div className="text-center" data-animate="fade-left">
              <h3 className="font-cormorant text-2xl font-bold text-autumn-brown mb-6">Валерия</h3>
              <img 
                src="https://cdn.poehali.dev/files/6f80dd29-e170-4293-bd82-61cf7e97adc0.jpg" 
                alt="Детские фото Валерии" 
                className="rounded-lg shadow-xl w-full h-auto card-hover"
              />
            </div>
            
            {/* Groom's childhood photos */}
            <div className="text-center" data-animate="fade-right">
              <h3 className="font-cormorant text-2xl font-bold text-autumn-brown mb-6">Игорь</h3>
              <img 
                src="https://cdn.poehali.dev/files/2f63e008-5ff8-419d-89e7-4b8d0ac5abc3.jpg" 
                alt="Детские фото Игоря" 
                className="rounded-lg shadow-xl w-full h-auto card-hover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-cormorant text-4xl md:text-5xl font-bold text-center text-autumn-brown mb-12" data-animate>
            Детали торжества
          </h2>
          
          <div className="max-w-2xl mx-auto">
            {/* Reception */}
            <Card className="border-autumn-gold/30 card-hover" data-animate="scale">
              <CardHeader className="text-center pb-4">
                <Icon name="PartyPopper" size={32} className="text-autumn-orange mx-auto mb-2" />
                <h3 className="font-cormorant text-2xl font-bold text-autumn-brown">
                  Торжество
                </h3>
              </CardHeader>
              <CardContent className="text-center space-y-3">
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <Icon name="Clock" size={18} />
                  <span>17:00 - 23:00</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <Icon name="MapPin" size={18} />
                  <span>Кафе "Алмаз"</span>
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
          <h2 className="font-cormorant text-4xl font-bold text-autumn-brown mb-8" data-animate>
            Дресс-код
          </h2>
          <div className="bg-card p-8 rounded-lg border border-autumn-gold/30 card-hover" data-animate="scale">
            <Icon name="Shirt" size={32} className="text-autumn-orange mx-auto mb-6" />
            <p className="text-lg text-muted-foreground mb-8">
              Просим вас выбрать наряды в осенней цветовой гамме.
            </p>
            
            {/* Color Palette */}
            <div className="flex flex-wrap justify-center gap-4 mb-4">
              <div className="flex flex-col items-center">
                <div 
                  className="w-16 h-16 rounded-full shadow-lg card-hover"
                  style={{ backgroundColor: '#8B4513' }}
                />
                <span className="text-sm text-muted-foreground mt-2">Коричневый</span>
              </div>
              <div className="flex flex-col items-center">
                <img 
                  src="https://cdn.poehali.dev/files/04be2fb7-b1c8-43ad-8f92-47ae2bf6d3a4.jpg"
                  alt="Коричневый"
                  className="w-16 h-16 rounded-full shadow-lg card-hover object-cover"
                />
                <span className="text-sm text-muted-foreground mt-2">Коричневый</span>
              </div>
              <div className="flex flex-col items-center">
                <img 
                  src="https://cdn.poehali.dev/files/82ec8273-e795-4aaf-a874-cfb89986086c.jpg"
                  alt="Терракотовый"
                  className="w-16 h-16 rounded-full shadow-lg card-hover object-cover"
                />
                <span className="text-sm text-muted-foreground mt-2">Терракотовый</span>
              </div>
              <div className="flex flex-col items-center">
                <img 
                  src="https://cdn.poehali.dev/files/6372025f-6f0e-454a-9d99-cc64a2f4dce3.jpg"
                  alt="Золотистый"
                  className="w-16 h-16 rounded-full shadow-lg card-hover object-cover"
                />
                <span className="text-sm text-muted-foreground mt-2">Золотистый</span>
              </div>
              <div className="flex flex-col items-center">
                <img 
                  src="https://cdn.poehali.dev/files/4b32d3ac-a985-4bc3-94a1-b3585396a27c.jpg"
                  alt="Бежевый"
                  className="w-16 h-16 rounded-full shadow-lg card-hover object-cover"
                />
                <span className="text-sm text-muted-foreground mt-2">Бежевый</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RSVP Form */}
      <section className="py-16 px-4 bg-card">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-cormorant text-4xl font-bold text-center text-autumn-brown mb-8" data-animate>
            Подтверждение присутствия
          </h2>
          <Card className="border-autumn-gold/30 card-hover" data-animate="scale">
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
                  className="w-full bg-autumn-orange hover:bg-autumn-orange/90 text-white font-semibold py-3 button-hover"
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
          <Icon name="Heart" size={24} className="text-autumn-orange mx-auto mb-4 animate-float" data-animate="scale" />
          <p className="text-muted-foreground mb-2" data-animate>
            С любовью и нетерпением ждём встречи,
          </p>
          <p className="font-cormorant text-xl text-autumn-brown" data-animate>
            Игорь и Валерия
          </p>
          <div className="mt-6 flex justify-center gap-4 text-sm text-muted-foreground" data-animate>
            <span>По вопросам: +7 (999) 123-45-67</span>
          </div>
        </div>
      </footer>
    </div>
  );
}