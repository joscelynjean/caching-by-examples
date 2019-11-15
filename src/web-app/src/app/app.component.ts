import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  // Use cases
  response1 = null;
  response2 = null;
  response3 = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('http://localhost:3000/cached-resources/1', {observe: 'response'}).subscribe((response: any) => {
      this.response1 = `[${response.status}] ${JSON.stringify(response.body)}`;
    });

    const random = this.generateRandomNumber(999999);
    this.http.get(`http://localhost:3000/cached-resources/2?random=${random}`, {observe: 'response'}).subscribe((response: any) => {
      this.response2 = `[${response.status}] ${JSON.stringify(response.body)}`;
    });

    this.http.get(`http://localhost:3000/cached-resources/3?fix=true`, {observe: 'response'}).subscribe((response: any) => {
      this.response3 = `[${response.status}] ${JSON.stringify(response.body)}`;
    });
  }

  reloadPage() {
    location.reload();
  }

  generateRandomNumber(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
  }
}
