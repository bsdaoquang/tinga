export class Validation {
  static email(mail: string) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  }
  static text = (value: string) => {
    if (!value) return false 

    const regex = /^[a-zA-Z0-9]+$/;
    if (!regex.test(value)) return false;

    if (value.length < 3 || value.length > 20) return false;

    return true;
  } 
}