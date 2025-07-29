// Rate limiting implementation
interface RateLimitStore {
    [key: string]: {
        count: number;
        resetTime: number;
    };
}

const rateLimitStore: RateLimitStore = {};

export function rateLimit(
    identifier: string,
    limit: number = 10, // máximo de requests
    windowMs: number = 60000 // janela de tempo em ms (1 minuto)
): { success: boolean; remaining: number; resetTime: number } {
    const now = Date.now();
    const windowStart = now - windowMs;

    // Limpa apenas a entrada do identificador atual, se estiver expirada
    if (rateLimitStore[identifier]?.resetTime < now) {
        delete rateLimitStore[identifier];
    }

    // Verifica se já existe entrada para este identificador
    if (!rateLimitStore[identifier]) {
        rateLimitStore[identifier] = {
            count: 1,
            resetTime: now + windowMs
        };
        return {
            success: true,
            remaining: limit - 1,
            resetTime: rateLimitStore[identifier].resetTime
        };
    }

    const entry = rateLimitStore[identifier];

    // Se o tempo resetou, reinicia o contador
    if (now >= entry.resetTime) {
        entry.count = 1;
        entry.resetTime = now + windowMs;
        return {
            success: true,
            remaining: limit - 1,
            resetTime: entry.resetTime
        };
    }

    // Incrementa o contador
    entry.count++;

    // Verifica se excedeu o limite
    if (entry.count > limit) {
        return {
            success: false,
            remaining: 0,
            resetTime: entry.resetTime
        };
    }

    return {
        success: true,
        remaining: limit - entry.count,
        resetTime: entry.resetTime
    };
}

// Função para obter identificador do cliente (IP + User Agent)
export function getClientIdentifier(request: Request): string {
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] :
        request.headers.get('x-real-ip') ||
        'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Cria um hash simples do IP + User Agent
    return `${ip}-${userAgent.slice(0, 50)}`;
}
