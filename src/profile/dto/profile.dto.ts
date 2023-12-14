export class UpdateProfileDto {
  findus: string; // Validation: Must not be empty
  language: string; // Validation: Must not be empty
  name: string; // Validation: Must contain only letters
  nationality: string; // Validation: Must not be empty
  phoneno: string; // Validation: Must be a valid 8-digit phone number
  address: string; // Validation: Must be longer than 3 characters
  emergencycontact: string; // Validation: Must not be empty
  emergencyrelationship: string; // Validation: Must not be empty
  emergencyphone: string; // Validation: Must be a valid 8-digit phone number
}
