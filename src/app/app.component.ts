import { Component } from '@angular/core';
import { TesseractWorker } from 'tesseract.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tesseract.js-angular-app';
  ocrResult = 'Recognizing...';
  fileUrl='https://i.imgur.com/IOQTtI4.png';
  progressValue = 0;
  progressStatus="";
  ocrWorker: TesseractWorker;
  htmlResult="";
  lines = [];
  constructor() {

  }

  ocrPage(withPdf):void {
    this.ocrWorker = new TesseractWorker();
    const options = withPdf? {
      'tessedit_create_pdf': '1',
    }:{};
    this.ocrWorker
      .recognize(this.fileUrl,'eng', options)
      .progress((p) => {
      // console.log('progress', p);

        this.progressValue=p.progress*100;
        if(this.progressValue === 100){
          this.progressStatus ="";
        } else {
          this.progressStatus=p.status;
        }
      })
      .then((result) => {
        this.ocrResult = result.text;
        this.htmlResult = result.hocr;
        this.lines = result.lines;
        // console.log(result);
        this.ocrStop();
      });
  }

  ocrStop():void{
        this.ocrWorker.terminate();
  }
}
