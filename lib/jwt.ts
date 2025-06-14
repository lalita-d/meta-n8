"use client"

// JWT token management
export class JWTService {
  private static readonly TOKEN_KEY = "metavertex_jwt_token"
  private static readonly REFRESH_KEY = "metavertex_refresh_token"

  static generateToken(user: any): string {
    // In production, this would be done on the server
    const payload = {
      userId: user.id,
      userType: user.userType,
      uniqueId: user.uniqueId,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 24 hours
    }

    // Simple base64 encoding for demo (use proper JWT library in production)
    return btoa(JSON.stringify(payload))
  }

  static setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token)
  }

  static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY)
  }

  static removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY)
    localStorage.removeItem(this.REFRESH_KEY)
  }

  static decodeToken(token: string): any {
    try {
      return JSON.parse(atob(token))
    } catch (error) {
      return null
    }
  }

  static isTokenValid(token: string): boolean {
    try {
      const decoded = this.decodeToken(token)
      return decoded && decoded.exp > Math.floor(Date.now() / 1000)
    } catch (error) {
      return false
    }
  }

  static getUserFromToken(): any {
    const token = this.getToken()
    if (token && this.isTokenValid(token)) {
      return this.decodeToken(token)
    }
    return null
  }
}
