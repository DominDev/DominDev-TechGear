# Claude-Mem - Plugin Persistent Memory

> **Automatyczna pamięć między sesjami Claude Code**
> Wersja: 9.0.1 | Data instalacji: 2026-01-09

---

## Spis treści

1. [Features](#features)
2. [Quick Start](#quick-start)
3. [Użycie](#użycie)
4. [Jak to działa](#jak-to-działa)
5. [Troubleshooting](#troubleshooting)
6. [Zaawansowane](#zaawansowane)

---

## Features

✅ **Automatyczna pamięć** - zapisuje wszystkie tool usage (Read, Edit, Bash, etc.)
✅ **AI compression** - kompresuje obserwacje używając Claude Agent SDK
✅ **Semantic search** - Chroma vector database + full-text search
✅ **Web dashboard** - UI na http://localhost:37777
✅ **Token efficiency** - 3-warstwowy system wyszukiwania (~10x oszczędność)
✅ **Privacy tags** - `<private>` wykluczają wrażliwe dane z zapisu

---

## Quick Start

### 1. Aktywacja aliasu (raz)

```bash
source ~/.bashrc
```

### 2. Uruchom worker

```bash
claude-mem start
```

### 3. Sprawdź status

```bash
claude-mem status
```

### 4. Dashboard

Otwórz: **http://localhost:37777**

---

## Użycie

### Komendy podstawowe

```bash
claude-mem start      # Uruchom worker
claude-mem stop       # Zatrzymaj worker
claude-mem restart    # Restart worker
claude-mem status     # Pokaż status + logi
claude-mem            # Interaktywne menu
```

### Worker service

⚠️ **Worker nie startuje automatycznie** - musisz ręcznie uruchomić przed pracą.

**Przed rozpoczęciem pracy:**
```bash
claude-mem start
```

**Po zakończeniu (opcjonalnie):**
```bash
claude-mem stop
```

💡 **Tip:** Worker może działać non-stop - jest lekki i nie przeszkadza.

### Interaktywne menu

```bash
claude-mem
```

Wyświetli:
```
============================================
   Claude-Mem Worker Service Control
============================================

Current status:
[RUNNING] Worker is active on port 37777
Dashboard: http://localhost:37777

============================================

Select action:

  1. Start worker
  2. Stop worker
  3. Restart worker
  4. Show status
  5. View logs
  6. Exit

Enter choice (1-6):
```

### Dashboard

**URL:** http://localhost:37777

**Funkcje:**
- Przeglądanie historii sesji
- Wyszukiwanie obserwacji (semantic + keyword)
- Statystyki użycia
- Ustawienia pluginu

### Privacy - wykluczanie wrażliwych danych

Użyj tagów `<private>`:

```markdown
<private>
API_KEY=secret123
PASSWORD=superSecure!
</private>
```

Plugin **NIE zapisze** tych danych do bazy.

---

## Jak to działa

### Lifecycle Hooks (5 hooków)

```
SessionStart → Ładuje kontekst z poprzednich sesji
UserPromptSubmit → Analizuje Twoje pytanie
PostToolUse → Zapisuje każde użycie narzędzia
Summary → AI kompresuje obserwacje
SessionEnd → Zapisuje wszystko do SQLite + wektory
```

### 3-Layer Search Workflow (Token Efficiency)

```
Layer 1: Index Search → Zwraca tylko IDs (~50-100 tokenów)
Layer 2: Timeline Context → Chronologiczny kontekst
Layer 3: Full Details → Tylko relevantne obs. (~500-1000 tokenów)
```

**Oszczędność:** ~10x vs. ładowanie całej historii

### Przykład działania

**Sesja 1:**
```
Ty: "Zmień navbar na Grid"
Claude: [Używa Edit tool]
Plugin: [Zapisuje observation #12345]
  - Tool: Edit
  - File: navbar.css
  - Change: Flexbox → Grid
  - AI Summary: "Changed navbar layout from Flexbox to CSS Grid"
```

**Sesja 2 (następnego dnia):**
```
Ty: "Dlaczego navbar używa Grid?"
Plugin: [Semantic search → znajduje #12345]
Claude: "Zmieniliśmy to wczoraj z Flexbox na Grid..." (pamięta!)
```

---

## Troubleshooting

### Problem: "SessionStart:startup hook error" w CLI

**Przyczyna:** Hooki wymagają **Bun runtime**, którego nie ma w PATH.

**Rozwiązanie:**

Otwórz PowerShell jako Administrator:
```powershell
powershell -c "irm bun.sh/install.ps1 | iex"
```

Lub przez npm:
```bash
npm install -g bun
```

Weryfikacja:
```bash
bun --version
```

**Po instalacji:** Restart Claude CLI - błędy znikną.

**Alternatywa:** GUI VSCode działa poprawnie mimo błędów w CLI.

### Problem: Port 37777 zajęty

**Sprawdź:**
```bash
netstat -ano | findstr :37777 | findstr LISTENING
```

**Zatrzymaj worker:**
```bash
claude-mem stop
```

### Problem: Worker pokazuje "RUNNING" ale localhost:37777 nie odpowiada

**Przyczyna:** Stan `TIME_WAIT` po zamknięciu połączenia może być mylony z aktywnym nasłuchiwaniem.

**Rozwiązanie:**
```bash
claude-mem status
```

Jeśli pokazuje "NOT RUNNING":
```bash
claude-mem start
```

### Problem: Worker nie startuje

**Check logs:**
```bash
claude-mem status
```

Sprawdź ostatnie linie logów w outputcie.

**Manual start:**
```bash
node ~/.claude/plugins/cache/thedotmack/claude-mem/9.0.1/scripts/worker-cli.js start
```

### Problem: PowerShell Execution Policy

Jeśli w PowerShell widzisz błąd execution policy:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Problem: Dziwne znaki w logach (Git Bash)

**Przyczyna:** Kodowanie UTF-8 nie jest ustawione.

**Fix:**
```bash
echo 'export LANG=en_US.UTF-8' >> ~/.bashrc
echo 'export LC_ALL=en_US.UTF-8' >> ~/.bashrc
source ~/.bashrc
```

---

## Zaawansowane

### Struktura plików

**Plugin:**
```
C:\Users\pdomi\.claude\plugins\cache\thedotmack\claude-mem\9.0.1\
```

**Data directory:**
```
C:\Users\pdomi\.claude-mem\
├── claude-mem.db          # SQLite database
├── chroma/                # Vector embeddings
├── logs/                  # Worker logs
│   └── claude-mem-YYYY-MM-DD.log
├── settings.json          # Configuration
├── .worker.pid
└── .worker.port
```

**Control script:**
```
_scripts/claude-mem.ps1    # Universal script (Git Bash, PowerShell, CMD)
```

### Konfiguracja

Plik: `C:\Users\pdomi\.claude-mem\settings.json`

**Domyślne ustawienia:**
```json
{
  "model": "claude-sonnet-4",
  "workerPort": 37777,
  "dataDir": "~/.claude-mem",
  "logLevel": "info",
  "contextInjection": {
    "enabled": true,
    "maxTokens": 5000
  }
}
```

### Health check

```bash
curl http://127.0.0.1:37777/api/health
```

**Expected:**
```json
{"status":"ok","pid":12345,"initialized":true,"mcpReady":true}
```

### Uniwersalny skrypt

**Jeden plik:** `_scripts/claude-mem.ps1` (PowerShell)

**Działa w:**
✅ Git Bash (przez `powershell.exe`)
✅ PowerShell (natywnie)
✅ CMD (przez `powershell.exe`)
✅ VSCode Terminal (wszystkie typy)

**Alias w Git Bash:**
```bash
alias claude-mem="powershell.exe -ExecutionPolicy Bypass -File _scripts/claude-mem.ps1"
```

**Użycie bezpośrednie w PowerShell:**
```powershell
_scripts\claude-mem.ps1 [start|stop|restart|status]
```

**W CMD:**
```cmd
powershell -ExecutionPolicy Bypass -File _scripts\claude-mem.ps1 start
```

### Installation summary

**Prerequisites:**
- ✅ Node.js 18.0.0+ (zainstalowane: v22.20.0)
- ✅ Git Bash (ścieżka: `D:\Program Files\Git\usr\bin\bash.exe`)
- ✅ Port 37777 (wolny)

**Installation steps (wykonane):**
```bash
# W Git Bash:
export CLAUDE_CODE_GIT_BASH_PATH="D:\\Program Files\\Git\\usr\\bin\\bash.exe"
claude

# W Claude CLI:
/plugin marketplace add thedotmack/claude-mem
/plugin install claude-mem
```

### Known Issues

1. **Worker nie startuje automatycznie** - wymagane ręczne uruchomienie
2. **CLI hooki wymagają Bun** - GUI VSCode działa bez Bun
3. **Wymaga Node.js 18+** - starsze wersje nie są wspierane

---

## Resources

- **GitHub:** https://github.com/thedotmack/claude-mem
- **Docs:** https://docs.claude-mem.ai
- **Website:** https://claude-mem.ai
- **License:** AGPL-3.0

---

*Ostatnia aktualizacja: 2026-01-09*
