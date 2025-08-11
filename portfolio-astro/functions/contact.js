export async function onRequestPost(context) {
  // Захист від надто великих запитів
  const contentLength = context.request.headers.get('content-length');
  if (contentLength && Number(contentLength) > 100_000) {
    return new Response('Payload too large', { status: 413 });
  }

  const form = await context.request.formData();
  const hp = form.get('website'); // honeypot
  if (hp) return new Response('No bots', { status: 403 });

  const name = String(form.get('name') || '').trim();
  const email = String(form.get('email') || '').trim();
  const message = String(form.get('message') || '').trim();

  // Проста валідація
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!name || !emailRe.test(email) || message.length < 10) {
    return new Response('Bad request', { status: 400 });
  }

  // TODO: Тут можна інтегрувати з Email (Resend, MailChannels) або Cloudflare KV/Queues
  // Без зберігання персональних даних у сторонніх сервісах.

  return new Response('OK', { status: 200 });
}

export const onRequest = [
  async ({ next, request }) => {
    // Заголовки безпеки
    const res = await next();
    const headers = new Headers(res.headers);
    headers.set('X-Content-Type-Options', 'nosniff');
    headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    headers.set('Permissions-Policy', 'accelerometer=(), geolocation=(), microphone=()');
    return new Response(res.body, { status: res.status, headers });
  }
];