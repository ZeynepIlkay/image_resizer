# Görüntü Boyutlandırıcı ve Sıkıştırıcı

Bu proje, kullanıcıların görüntüleri yeniden boyutlandırmasına ve sıkıştırmasına olanak tanıyan basit bir React tabanlı web uygulamasıdır. Kullanıcılar bir görüntü yükleyebilir, boyutlarını belirleyebilir veya bir yüzde ile ölçekleyebilir, kalite ayarlarını yapabilir ve sıkıştırılmış görüntüyü indirebilir.
![image](https://github.com/user-attachments/assets/d56ed48b-a759-435b-a546-354bdc9dda0c)



## Özellikler

- Farklı formatlarda (JPEG, PNG vb.) görüntü yükleme
- Görüntü boyutunu genişlik ve yükseklik olarak belirleyebilme veya yüzde ile ölçeklendirme
- Kaliteyi ayarlamak için kaydırıcı kullanma
- Yeniden boyutlandırılmış ve sıkıştırılmış görüntüyü ön izleme
- İşlenmiş görüntüyü JPEG formatında indirme


## Kurulum

1. Bu repoyu klonlayın:
   git clone <repo url>
   cd image-resizer-compressor
   
2. Gerekli bağımlılıkları yükleyin:
    npm install
   
4. Geliştirme sunucusunu başlatın:
    npm start

 ## Kullanılan Teknolojiler
- React: Kullanıcı arayüzünü oluşturmak için kullanılan JavaScript kütüphanesi.
- HTML5 Canvas: Görüntüleri yeniden boyutlandırmak ve sıkıştırmak için kullanılıyor.
- FileReader API: Kullanıcının yüklediği görüntü dosyalarını okumak için kullanılıyor.
