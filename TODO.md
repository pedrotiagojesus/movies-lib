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
- [ ] Definir estado normal do card com:
  - [ ] Poster
  - [ ] Título
  - [ ] ⭐ Rating
- [ ] Mover informação secundária para interação:
  - [ ] Ano
  - [ ] Idioma
  - [ ] Género (1 linha, opcional)

---

## 🎯 3. Hierarquia Visual
- [ ] Dar mais destaque ao título (peso / contraste)
- [ ] Reduzir destaque visual do rating
- [ ] Garantir alinhamento consistente do rating
- [ ] Evitar competição visual entre elementos

---

## ✂️ 4. Títulos Longos
- [X] Aplicar line-clamp (máx. 2 linhas)
- [X] Adicionar ellipsis
- [ ] (Opcional) Mostrar título completo no detalhe ou tooltip

---

## 🖱️ 5. Interações & Hover (Tablet / Desktop)
- [ ] Elevação suave do card no hover
- [ ] Shadow subtil no hover
- [ ] Overlay escuro no poster
- [ ] Mostrar botão “Details” apenas no hover (desktop)

---

## 🎬 6. Micro-preview
- [ ] Mostrar no overlay / tap:
  - [ ] ⭐ Rating
  - [ ] Ano
  - [ ] Botão Details
- [ ] Adicionar transições suaves (200–300ms, ease-out)

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
- [ ] Usar um único tom de dourado (logo, estrelas, botões)
- [ ] Rever contraste do texto secundário
- [ ] Validar contraste WCAG (mínimo AA)
- [ ] Uniformizar estilos de botões e badges

---

## 📐 10. Escala Progressiva (a partir do mobile)
- [ ] Tablet (768px+)
  - [ ] 2–3 filmes por linha
- [ ] Desktop (1024px+)
  - [ ] 4 filmes por linha
- [ ] Desktop largo (1600px+)
  - [ ] 5 filmes por linha (máx. 6)
- [ ] Usar grid fluida com `minmax`

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
