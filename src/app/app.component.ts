import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'myproject';
  private localStorageKey = 'authToken';

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string): void {
    // Appel à l'API pour la connexion avec l'email et le mot de passe
    this.http.post<any>('localhost:8080/realms/springdev-realm/protocol/openid-connect/token', { username, password })
      .subscribe(
        (response) => {
          console.log(response)
          // Récupération du token depuis la réponse de l'API
          const authToken = response.access_token;
          console.log(authToken)

          // Stockage du token dans le localStorage
          localStorage.setItem(this.localStorageKey, authToken);

          // Redirection vers le tableau de bord après la connexion réussie
          this.router.navigate(['/DashbordAdmin']);
        },
        (error) => {
          // Gérer les erreurs lors de la connexion (par exemple, afficher un message d'erreur)
          console.error('Erreur de connexion : ', error);
        }
      );
  }
}
