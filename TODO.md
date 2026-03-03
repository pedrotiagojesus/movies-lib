# 🎬 MoviesLib — UI/UX TODO (Mobile-First)

Checklist para melhorar a apresentação dos filmes e elevar a experiência do utilizador,
seguindo uma abordagem **mobile-first**.

---

## 📱 1. Mobile Layout Base (PRIORIDADE)
- [X] Definir layout base para mobile (≤ 480px)
  - [X] 2 filmes por linha (default)
  - [-] Alternativa: 1 por linha em páginas de detalhe
- [X] Garantir posters legíveis (mín. ~160–180px largura)
- [ ] Reduzir informação visível no card
- [ ] CTA sempre visível (não depender de hover)
- [ ] Substituir hover por:
  - [ ] Tap para revelar info
  - [ ] Ou botão “Details” sempre visível
- [ ] Aumentar áreas clicáveis (mín. 44px)
- [ ] Ajustar espaçamentos para uso com polegar

---

## 🧱 2. Estrutura do Card
- [X] Definir estado normal do card com:
  - [X] Poster
  - [X] Título
  - [X] ⭐ Rating
- [X] Mover informação secundária para interação:
  - [X] Ano
  - [X] Idioma
  - [X] Género (1 linha, opcional)

---

## 🎯 3. Hierarquia Visual
- [X] Dar mais destaque ao título (peso / contraste)
- [X] Reduzir destaque visual do rating
- [X] Garantir alinhamento consistente do rating
- [X] Evitar competição visual entre elementos

---

## ✂️ 4. Títulos Longos
- [X] Aplicar line-clamp (máx. 2 linhas)
- [X] Adicionar ellipsis
- [X] (Opcional) Mostrar título completo no detalhe ou tooltip

---

## 🖱️ 5. Interações & Hover (Tablet / Desktop)
- [X] Elevação suave do card no hover
- [X] Shadow subtil no hover
- [X] Overlay escuro no poster
- [X] Mostrar botão “Details” apenas no hover (desktop)

---

## 🎬 6. Micro-preview
- [X] Mostrar no overlay / tap:
  - [X] ⭐ Rating
  - [X] Ano
  - [X] Botão Details
- [X] Adicionar transições suaves (200–300ms, ease-out)

---

## 🗂️ 7. Organização do Conteúdo
- [ ] Criar secções:
  - [ ] Trending
  - [ ] Top Rated
  - [ ] Upcoming
- [ ] Alternativa:
  - [ ] Chips de destaque (Popular, New, Top 10)

---

## 🟡 8. Call-to-Action
- [ ] Avaliar texto do CTA:
  - [ ] Details
  - [ ] View details
  - [ ] More info
- [ ] Testar ícone + texto
- [ ] Garantir CTA claro no mobile

---

## 🎨 9. Consistência Visual
- [X] Usar um único tom de dourado (logo, estrelas, botões)
- [X] Rever contraste do texto secundário
- [X] Validar contraste WCAG (mínimo AA)
- [X] Uniformizar estilos de botões e badges

---

## 📐 10. Escala Progressiva (a partir do mobile)
- [X] Tablet (768px+)
  - [X] 2–3 filmes por linha
- [X] Desktop (1024px+)
  - [X] 4 filmes por linha
- [X] Desktop largo (1600px+)
  - [X] 5 filmes por linha (máx. 6)
- [X] Usar grid fluida com `minmax`

---

## 🧪 11. Polimento Final
- [ ] Rever espaçamentos gerais
- [ ] Testar títulos muito longos
- [ ] Testar ratings extremos (0.0 / 10.0)
- [ ] Implementar lazy loading de imagens
- [ ] Testar performance em 4G
- [ ] Validar experiência com uso real (scroll + taps)

---

## 🚀 Ordem Recomendada (Mobile-First)
1. Mobile layout base
2. Estrutura do Card
3. Hierarquia visual
4. Títulos longos
5. CTA e interações
6. Organização do conteúdo
7. Escala para tablet e desktop
8. Polimento final

---
