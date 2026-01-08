import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-app.html',
  styleUrls: ['./form-app.css'],
})
export class AppComponent {
  participationForm: FormGroup;
  imagePreview: string | null = null;
  whatsappNumber = '201068692087';

  constructor(private fb: FormBuilder) {
    this.participationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      birthDate: ['', Validators.required],
      address: ['', Validators.required],
      education: ['', Validators.required],
      height: ['', [Validators.required, Validators.min(100)]],
      waist: ['', [Validators.required, Validators.min(40)]],
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const maxSizeInBytes = 1 * 1024 * 1024;
      if (file.size > maxSizeInBytes) {
        event.target.value = '';
        this.imagePreview = null;
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  submitForm() {
    if (this.participationForm.valid) {
      const data = this.participationForm.value;
      const message = `🌟 استمارة مشاركة جديدة - Miss Sham 🌟\n\n👤 الاسم: ${data.name}\n📅 الميلاد: ${data.birthDate}\n📍 العنوان: ${data.address}\n🎓 التعليم: ${data.education}\n📏 الطول: ${data.height} سم\n⭕ الخصر: ${data.waist} سم`;
      const whatsappUrl = `https://api.whatsapp.com/send?phone=${
        this.whatsappNumber
      }&text=${encodeURIComponent(message)}`;
      window.location.href = whatsappUrl;
    } else {
      this.participationForm.markAllAsTouched();
    }
  }

  async captureAndSend() {
  if (this.participationForm.invalid || !this.imagePreview) {
    this.participationForm.markAllAsTouched();
    alert('⚠️ يرجى تعبئة البيانات ورفع الصورة أولاً');
    return;
  }

  const data = this.participationForm.value;

  // 1. إنشاء عنصر Canvas برمجياً
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // 2. تحديد مقاسات البطاقة (مثلاً 600x800)
  canvas.width = 600;
  canvas.height = 800;

  // 3. رسم الخلفية (تدرج ألوان ملوكي)
  const gradient = ctx.createLinearGradient(0, 0, 0, 800);
  gradient.addColorStop(0, '#7c3aed'); // Purple 600
  gradient.addColorStop(1, '#db2777'); // Pink 600
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 600, 800);

  // 4. رسم الصورة الشخصية (دائرية)
  const img = new Image();
  img.src = this.imagePreview;
  
  img.onload = () => {
    // رسم دائرة للصورة
    ctx.save();
    ctx.beginPath();
    ctx.arc(300, 150, 80, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(img, 220, 70, 160, 160);
    ctx.restore();

    // 5. كتابة النصوص
    ctx.fillStyle = '#facc15'; // Yellow 300
    ctx.textAlign = 'center';
    ctx.font = 'bold 35px Arial';
    ctx.fillText('Miss Sham - ملكة جمال بلاد الشام', 300, 280);

    ctx.fillStyle = 'white';
    ctx.font = '25px Arial';
    ctx.textAlign = 'right';
    
    // إحداثيات النصوص
    const startX = 550;
    ctx.fillText(`الاسم: ${data.name}`, startX, 360);
    ctx.fillText(`تاريخ الميلاد: ${data.birthDate}`, startX, 420);
    ctx.fillText(`العنوان: ${data.address}`, startX, 480);
    ctx.fillText(`المؤهل: ${data.education}`, startX, 540);
    ctx.fillText(`الطول: ${data.height} سم`, startX, 600);
    ctx.fillText(`محيط الخصر: ${data.waist} سم`, startX, 660);

    ctx.font = 'italic 18px Arial';
    ctx.fillText('Designed by Mohamed Haikal', 550, 760);

    // 6. تصدير وتحميل الصورة
    const finalImage = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `Miss-Sham-${data.name}.png`;
    link.href = finalImage;
    link.click();

    alert('✅ تم توليد بطاقة المشاركة وحفظها بنجاح!');
    
    const message = `مرحباً، هذه بطاقة اشتراكي في مسابقة ملكة جمال بلاد الشام باسم: ${data.name}`;
    window.open(`https://api.whatsapp.com/send?phone=${this.whatsappNumber}&text=${encodeURIComponent(message)}`, '_blank');
  };
}

  // async captureAndSend() {
  //   // التحقق من الحقول أولاً
  //   if (this.participationForm.invalid) {
  //     this.participationForm.markAllAsTouched();
  //     return;
  //   }

  //   if (!this.imagePreview) {
  //     return;
  //   }

  //   const element = document.getElementById('captureElement');
  //   if (!element) return;

  //   try {
  //     // استخدام المكتبة بشكل مباشر مع await
  //     const canvas = await html2canvas(element, {
  //       useCORS: true,
  //       scale: 2,
  //       backgroundColor: '#ffffff',
  //       logging: true, // فعلنا التتبع لنعرف الخطأ في الكونسول إذا حدث
  //     });

  //     const imageData = canvas.toDataURL('image/png');

  //     const link = document.createElement('a');
  //     link.href = imageData;
  //     link.download = `Miss-Sham-${this.participationForm.value.name || 'Application'}.png`;
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);


  //     const message = `مرحباً، هذه استمارة التقديم الخاصة بي باسم: ${this.participationForm.value.name}`;
  //     const whatsappUrl = `https://api.whatsapp.com/send?phone=${
  //       this.whatsappNumber
  //     }&text=${encodeURIComponent(message)}`;

  //     window.open(whatsappUrl, '_blank');
  //   } catch (error) {
  //     // إذا حدث خطأ، سنطبعه في الكونسول لنعرف سببه الحقيقي
  //     console.error('Html2Canvas Error Details:', error);
  //   }
  // }
}
