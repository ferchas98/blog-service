# Blog Service

Este proyecto es un servicio RESTful para un blog similar a [dev.to](http://dev.to), desarrollado utilizando Node.js, Express, MongoDB y JWT para la autenticación.

## Requisitos

- Node.js v14 o superior
- MongoDB

## Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/tu-usuario/blog-service.git
cd blog-service
```

2. Instala las dependencias:

```bash
npm install
```

3. Configura las variables de entorno:

Crea un archivo .env en la raíz del proyecto con el siguiente contenido, reemplazando los valores según sea necesario:

```bash
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_NAME=

JWT_SECRET=
```

## Uso

Inicia el servidor:

```bash
npm run dev
```

## Endpoints Disponibles

1. POST /user : Registra un nuevo usuario.

Solicitud:

```bash
{
  "name": "John Doe",
  "profilePic": "http://example.com/profile.jpg",
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```

2. GET /user/id : Obtiene la información de un usuario por ID.

Respuesta:

```bash
{
  "_id": "60d0fe4f5311236168a109ca",
  "name": "John Doe",
  "profilePic": "http://example.com/profile.jpg",
  "email": "john.doe@example.com",
  "created_at": "2024-06-06T00:00:00.000Z",
  "updated_at": "2024-06-06T00:00:00.000Z"
}
```

## Autenticación

1. POST /auth/login : Otorga un nuevo JWT al iniciar sesión.

Solicitud:

```bash
{
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```

## Post

1. POST /posts : Crea un nuevo post (requiere autenticación).

Solicitud:

```bash
{
  "title": "My First Post",
  "image": "http://example.com/image.jpg",
  "body": "This is the body of my first post."
}
```

2. GET /posts: Lista todos los posts. Soporta filtrado por título usando un query param llamado search.

Respuesta:

```bash
[
  {
    "_id": "60d0fe4f5311236168a109cb",
    "title": "My First Post",
    "image": "http://example.com/image.jpg",
    "body": "This is the body of my first post.",
    "user": {
      "_id": "60d0fe4f5311236168a109ca",
      "name": "John Doe"
    },
    "created_at": "2024-06-06T00:00:00.000Z",
    "updated_at": "2024-06-06T00:00:00.000Z"
  }
]
```

3. PATCH /posts/ : Actualiza un post (requiere autenticación).

Solicitud:

```bash
{
  "title": "Updated Post Title",
  "body": "Updated body content."
}
```

4. DELETE /posts/: Elimina un post (requiere autenticación).

Respuesta:

```bash
{
  "message": "Post deleted successfully"
}
```

Este `README.md` debería proporcionar toda la información necesaria para que otros desarrolladores comprendan y utilicen el proyecto
