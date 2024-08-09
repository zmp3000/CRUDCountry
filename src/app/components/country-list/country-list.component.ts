import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CountryService } from '../../service/country.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-country-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatButtonModule],
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss'],
  providers: [CountryService]
})
export class CountryListComponent implements OnInit {
  countries: any[] = [];
  editingCountryId: number | null = null;

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries(): void {
    this.countryService.getCountries().subscribe((data) => {
      this.countries = data;
    });
  }

  startEditing(id: number): void {
    this.editingCountryId = id;
  }

  saveCountry(country: any): void {
    if (country.name.trim() === '') {
      this.deleteCountry(country.id);
    } else {
      this.countryService.updateCountry(country).subscribe(() => {
        this.editingCountryId = null;
        this.loadCountries();
      });
    }
  }

  deleteCountry(id: number): void {
    if (confirm('Are you sure you want to delete this country?')) {
      this.countryService.deleteCountry(id).subscribe(() => {
        this.loadCountries();
      });
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const targetElement = event.target as HTMLElement;
    if (
      this.editingCountryId !== null &&
      !targetElement.closest('.country-item')
    ) {
      this.editingCountryId = null;
    }
  }
}
