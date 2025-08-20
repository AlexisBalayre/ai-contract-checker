# ---------- Base image ----------
FROM python:3.13-slim AS base
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    POETRY_NO_INTERACTION=1 \
    POETRY_VIRTUALENVS_IN_PROJECT=true \
    POETRY_VERSION=2.1.3

WORKDIR /app

# System deps
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl ca-certificates && \
    rm -rf /var/lib/apt/lists/*

# Install Poetry
RUN pip install "poetry==${POETRY_VERSION}"

# ---------- Dependencies layer ----------
FROM base AS deps
WORKDIR /app

# Copy manifests only (better cache)
COPY pyproject.toml ./
COPY poetry.lock* ./

# Install runtime deps only
RUN poetry install --no-root --only main --no-ansi

# ---------- Runtime ----------
FROM python:3.13-slim AS runtime
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PATH="/app/.venv/bin:$PATH"

WORKDIR /app

# Copy virtual env
COPY --from=deps /app/.venv /app/.venv

# Copy app code
COPY src ./src

EXPOSE 8000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --retries=5 \
  CMD python -c "import urllib.request; urllib.request.urlopen('http://127.0.0.1:8000/health').read()" || exit 1

# Run FastAPI with uvicorn
CMD ["uvicorn", "ai.main:app", "--host", "0.0.0.0", "--port", "8000"]
