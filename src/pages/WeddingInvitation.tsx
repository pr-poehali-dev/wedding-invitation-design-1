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
    attending: '',
    alcohol: '',
    message: ''
  });

  useScrollAnimation();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://functions.poehali.dev/4df592cd-eb65-4e42-a699-c51842f4880f', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      
      if (response.ok) {
        alert('Спасибо за ваш ответ! Мы с нетерпением ждем встречи с вами на нашем торжестве! 💕');
        
        // Reset form
        setFormData({
          name: '',
          attending: '',
          alcohol: '',
          message: ''
        });
      } else {
        alert(`Ошибка: ${result.error || 'Не удалось отправить ответ'}`);
      }
    } catch (error) {
      alert('Произошла ошибка при отправке. Попробуйте еще раз.');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
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
          <p className="text-3xl md:text-4xl font-cormorant font-bold text-autumn-orange mb-4" data-animate>
            ПРИГЛАШАЮТ НА СВОЮ СВАДЬБУ
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
            Дорогие<br />родные и друзья!
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
              Нам будет очень приятно,<br />
              если Вы поддержите цветовую<br />
              гамму торжества и выберете<br />
              наряды в соответствии<br />
              с цветовой палитрой<br />
              нашей свадьбы
            </p>
            
            {/* Color Palette */}
            <div className="flex flex-wrap justify-center gap-4 mb-4">
              <div 
                className="w-16 h-16 rounded-full shadow-lg card-hover"
                style={{ backgroundColor: '#8B4513' }}
              />
              <img 
                src="https://cdn.poehali.dev/files/04be2fb7-b1c8-43ad-8f92-47ae2bf6d3a4.jpg"
                alt="Коричневый"
                className="w-16 h-16 rounded-full shadow-lg card-hover object-cover"
              />
              <img 
                src="https://cdn.poehali.dev/files/82ec8273-e795-4aaf-a874-cfb89986086c.jpg"
                alt="Терракотовый"
                className="w-16 h-16 rounded-full shadow-lg card-hover object-cover"
              />
              <img 
                src="https://cdn.poehali.dev/files/6372025f-6f0e-454a-9d99-cc64a2f4dce3.jpg"
                alt="Золотистый"
                className="w-16 h-16 rounded-full shadow-lg card-hover object-cover"
              />
              <img 
                src="https://cdn.poehali.dev/files/4b32d3ac-a985-4bc3-94a1-b3585396a27c.jpg"
                alt="Бежевый"
                className="w-16 h-16 rounded-full shadow-lg card-hover object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* RSVP Form */}
      <section className="py-16 px-4 bg-card">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-cormorant text-4xl font-bold text-center text-autumn-brown mb-8" data-animate>
            Подтвердите, пожалуйста,<br />
            своё присутствие<br />
            на нашем торжестве!
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
                  <Label className="text-autumn-brown font-semibold">
                    Мы хотим, чтобы свадьба прошла весело, поэтому просим Вас выбрать алкоголь, который Вы предпочитаете
                  </Label>
                  <div className="mt-2 space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="alcohol"
                        value="champagne"
                        onChange={(e) => handleInputChange('alcohol', e.target.value)}
                        className="mr-2"
                      />
                      <span>Шампанское</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="alcohol"
                        value="wine"
                        onChange={(e) => handleInputChange('alcohol', e.target.value)}
                        className="mr-2"
                      />
                      <span>Вино</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="alcohol"
                        value="vodka"
                        onChange={(e) => handleInputChange('alcohol', e.target.value)}
                        className="mr-2"
                      />
                      <span>Водка</span>
                    </label>
                  </div>
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
                  disabled={isSubmitting}
                  className="w-full bg-autumn-orange hover:bg-autumn-orange/90 text-white font-semibold py-3 button-hover disabled:opacity-50"
                >
                  {isSubmitting ? 'Отправляем...' : 'Отправить подтверждение'}
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
            <span>•</span>
            <a href="/admin" className="text-autumn-orange hover:underline">
              Панель администратора
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}