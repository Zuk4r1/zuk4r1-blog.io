/**
 * Utilidades de sanitización y validación para seguridad OWASP
 */

// Sanitizar HTML para prevenir XSS
export const sanitizeHtml = (str: string): string => {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    "/": '&#x2F;',
  };
  const reg = /[&<>"'/]/ig;
  return str.replace(reg, (match) => map[match]);
};

// Validar y sanitizar entrada de búsqueda
export const sanitizeSearchInput = (input: string): string => {
  // Limitar longitud
  const maxLength = 100;
  let sanitized = input.trim().slice(0, maxLength);
  
  // Remover caracteres peligrosos
  sanitized = sanitized.replace(/[<>'";&()]/g, '');
  
  return sanitized;
};

// Validar formato de slug
export const isValidSlug = (slug: string): boolean => {
  const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugPattern.test(slug) && slug.length <= 200;
};

// Validar tag
export const sanitizeTag = (tag: string): string => {
  // Solo alfanuméricos, espacios y algunos caracteres especiales permitidos
  return tag.trim().replace(/[^a-zA-Z0-9\s\-+#]/g, '').slice(0, 50);
};

// Rate limiting simple en cliente (prevenir abuse)
class SimpleRateLimiter {
  private attempts: Map<string, number[]> = new Map();
  
  checkLimit(key: string, maxAttempts: number, windowMs: number): boolean {
    const now = Date.now();
    const attempts = this.attempts.get(key) || [];
    
    // Filtrar intentos dentro de la ventana
    const recentAttempts = attempts.filter(time => now - time < windowMs);
    
    if (recentAttempts.length >= maxAttempts) {
      return false; // Rate limit exceeded
    }
    
    recentAttempts.push(now);
    this.attempts.set(key, recentAttempts);
    
    return true;
  }
  
  reset(key: string): void {
    this.attempts.delete(key);
  }
}

export const searchRateLimiter = new SimpleRateLimiter();

// Validar URL (para prevenir open redirect)
export const isValidUrl = (url: string): boolean => {
  try {
    const parsed = new URL(url);
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch {
    return false;
  }
};

// CSP nonce generator (para uso con inline scripts si es necesario)
export const generateNonce = (): string => {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};
