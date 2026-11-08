FROM python:3.11-slim

WORKDIR /var/server

# компилятор для C++-библиотеки парсера
RUN apt-get update && apt-get install -y --no-install-recommends g++ \
    && rm -rf /var/lib/apt/lists/*

COPY cpp_libs/parser /tmp/parser
RUN cd /tmp/parser \
    && g++ -c -o library.o library.cpp -fPIC \
    && g++ -shared -o /usr/lib/libparse.so library.o \
    && ldconfig

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt "bcrypt==4.0.1"

COPY . .
RUN mkdir -p trash

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]