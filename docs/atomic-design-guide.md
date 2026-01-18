# Atomic Design Guide

Este guia define **regras claras e operacionais** para criação de componentes seguindo o Atomic Design.

## 🧱 Níveis do Atomic Design

### 1. **Atoms**
Componentes atômicos: **menores unidades visuais**.

**Responsabilidades**
- Aplicar tokens de design system (cores, tipografia, espaçamentos)

**Regras**
- ❌ Não fazem fetch de dados
- ❌ Não acessam lógica de negócio
- ❌ Não importam molécules ou organisms

**Exemplos**
- `Text`
- `Button`
- `Icon`
- `Avatar`
- `Divider`

---

### 2. **Molecules**
Combinações simples de atoms formando padrões.

**Responsabilidades**
- Encapsular pequenos padrões visuais
- Receber dados via props

**Regras**
- ❌ Não fazem fetch de dados
- ❌ Não importam organisms

**Exemplos**
- `LabeledInput`
- `UserInline`
- `ActionRow`

---

### 3. **Organisms**
Blocos completos da interface.

**Responsabilidades**
- Compor molecules e atoms
- Renderizar seções completas
- Podem fazer **fetch de dados simples** ou usar state local

**Regras**
- ❌ Não controlam navegação complexa
- ❌ Não realizam lógica de negócio pesada

**Exemplos**
- `PostCard`
- `ProfileHeader`
- `Modal`
- `ParallaxScrollView`

---

### 4. **Screens**
Telas completas do app.

**Responsabilidades**
- Orquestrar lógica de navegação
- Buscar dados e coordenar organisms

**Regras**
- ❌ Não definem estilos atômicos

---

## 🎨 Tokens Semânticos

Use sempre tokens semânticos em vez de cores diretas:

**Exemplos**
- `text`
- `textSecondary`
- `surface`
- `accent`
- `border`

```tsx
<Text color="text" />
```

---

## 🧩 Estrutura de Pastas Recomendada

```
components/
├── atoms/
├── molecules/
└── organisms/
screens/
theme/
hooks/
```

- `components/` contém UI organizada por Atomic Design

---

## 🛑 Antipadrões (proibidos)

- ❌ Atoms com lógica de negócio ou fetch
- ❌ Organisms com navegação acoplada
- ❌ Uso de cores hexadecimais no código

---

## 🧠 Decision Rules (para IA)

Antes de criar ou classificar um componente:

1. Faz *fetch* de dados? → **Organism**
2. Controla layout ou estrutura? → **Organism**
3. Combina atoms? → **Molecule**
4. Apenas renderiza UI simples? → **Atom**

---

## 📌 Regras de Importação

- `atoms/*` não importam `molecules/*` nem `organisms/*`
- `molecules/*` não importam `organisms/*`
- `organisms/*` importam molecules e atoms
- `screens/*` importam tudo

---

## 🌟 Padrões de Comportamento

| Componente              | Categoria   | Pode fetch? |
|-------------------------|-------------|-------------|
| Simple Atom (Text/Btn)  | Atom        | ❌          |
| UserInline              | Molecule    | ❌          |
| PostCard                | Organism    | Opcional    |
| Modal (genérico)        | Organism    | ❌          |
| ParallaxScrollView      | Organism    | ❌          |

---

## 🎯 Resumo

1. **Atoms** → UI mínima  
2. **Molecules** → Combinação simples  
3. **Organisms** → Blocos com optional fetch  
4. **Screens** → Lógica + navegação

