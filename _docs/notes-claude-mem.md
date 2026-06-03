# Claude-Mem Cheatsheet

> Szybka ściągawka komend i rozwiązań

---

## Komendy

### Start/Stop/Status

```bash
claude-mem start      # Uruchom worker
claude-mem stop       # Zatrzymaj worker
claude-mem restart    # Restart worker
claude-mem status     # Status + logi (ostatnie 10 linii)
claude-mem            # Interaktywne menu (opcje 1-6)
```

### Dashboard

```
http://localhost:37777
```

---

## Quick Checks

### Czy worker działa?

```bash
netstat -ano | findstr :37777 | findstr LISTENING
```

- **Output:** Worker działa ✅
- **Brak output:** Worker zatrzymany ❌

### Health endpoint

```bash
curl http://127.0.0.1:37777/api/health
```

**Expected:**
```json
{"status":"ok","pid":12345,"initialized":true}
```

### Logi

```bash
claude-mem status     # Ostatnie 10 linii
```

Lub pełne logi:
```bash
cat ~/.claude-mem/logs/claude-mem-$(date +%Y-%m-%d).log
```

---

## Quick Fixes

### ❌ SessionStart hook error (CLI)

```powershell
# PowerShell jako Admin:
powershell -c "irm bun.sh/install.ps1 | iex"
```

Restart terminal.

### ❌ localhost:37777 nie odpowiada

```bash
claude-mem restart
```

### ❌ Port 37777 zajęty

```bash
claude-mem stop
claude-mem start
```

### ❌ Alias nie działa

```bash
source ~/.bashrc
```

### ❌ Dziwne znaki w logach (Git Bash)

```bash
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8
```

Permanentnie:
```bash
echo 'export LANG=en_US.UTF-8' >> ~/.bashrc
echo 'export LC_ALL=en_US.UTF-8' >> ~/.bashrc
source ~/.bashrc
```

### ❌ PowerShell Execution Policy

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## Lokalizacje plików

| Item | Path |
|------|------|
| **Plugin** | `~/.claude/plugins/cache/thedotmack/claude-mem/9.0.1/` |
| **Database** | `~/.claude-mem/claude-mem.db` |
| **Logs** | `~/.claude-mem/logs/` |
| **Settings** | `~/.claude-mem/settings.json` |
| **Script** | `_scripts/claude-mem.ps1` |

---

## Privacy

Wyklucz wrażliwe dane:

```markdown
<private>
API_KEY=secret123
</private>
```

---

## Daily Workflow

### Rano:
```bash
claude-mem start
```

### Sprawdzenie:
```bash
claude-mem status
```

### Wieczorem (opcjonalnie):
```bash
claude-mem stop
```

💡 Worker może działać non-stop.

---

## Instalacja Bun (opcjonalnie)

```powershell
# PowerShell jako Admin:
powershell -c "irm bun.sh/install.ps1 | iex"
```

Weryfikacja:
```bash
bun --version
```

---

## Manual Worker Control

### Start (bez skryptu):
```bash
node ~/.claude/plugins/cache/thedotmack/claude-mem/9.0.1/scripts/worker-cli.js start
```

### Stop:
```bash
node ~/.claude/plugins/cache/thedotmack/claude-mem/9.0.1/scripts/worker-cli.js stop
```

---

## Environments

**Gdzie działa `claude-mem` alias:**

✅ Git Bash
✅ PowerShell (bezpośrednio: `_scripts\claude-mem.ps1`)
✅ CMD (przez PowerShell wrapper)
✅ VSCode Terminal (wszystkie typy)

---

## Pomoc

**Pełny guide:** `_docs/claude-mem.md`

**GitHub Issues:** https://github.com/thedotmack/claude-mem/issues

---

*Cheatsheet wersja: 2026-01-09*
