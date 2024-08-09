import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CountryEditComponent } from './components/country-edit/country-edit.component';
import { CountryListComponent } from './components/country-list/country-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    MatSlideToggleModule,
    CountryEditComponent,
    CountryListComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'countriesApp';

  @ViewChild(CountryListComponent) countryListComponent!: CountryListComponent;

  onCountryAdded(): void {
    this.countryListComponent.loadCountries();
  }
}
