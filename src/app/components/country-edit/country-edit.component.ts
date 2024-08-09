import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CountryService } from '../../service/country.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-country-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './country-edit.component.html',
  styleUrls: ['./country-edit.component.scss'],
  providers: [CountryService],
})
export class CountryEditComponent implements OnInit {
  @Output() countryChanged = new EventEmitter<void>();

  countryForm: FormGroup;
  countryId: number = 0;

  constructor(
    private fb: FormBuilder,
    private countryService: CountryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.countryForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(255),
          this.noWhitespaceValidator,
        ],
      ],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.countryId = +params['id'];
      if (this.countryId) {
        this.countryService.getCountry(this.countryId).subscribe((data) => {
          this.countryForm.patchValue(data);
        });
      }
    });
  }

  noWhitespaceValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const isWhitespace = (control.value || '').trim().length === 0;
    return isWhitespace ? { whitespace: true } : null;
  }

  onSubmit(): void {
    if (this.countryForm.valid) {
      console.log(this.countryId)
      const countryData = {
        name: this.countryForm.get('name')?.value.trim(),
      };

      if (this.countryId) {
        this.countryService.updateCountry(countryData).subscribe(() => {
          this.countryChanged.emit();
          this.router.navigate(['/countries']);
        });
      } else {
        this.countryService.addCountry(countryData).subscribe(() => {
          this.countryChanged.emit();
          this.router.navigate(['/countries']);
        });
      }
    }
  }
}
