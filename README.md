# 📘 Opinion Manager

Sistema de gestión de opiniones similar a las publicaciones de Facebook. Permite a los usuarios registrarse, iniciar sesión, crear publicaciones, comentar y gestionar categorías.

## 📌 Características principales

- Registro e inicio de sesión de usuarios.
- Gestión de perfiles (actualización de datos y foto de perfil).
- Creación, actualización y eliminación de publicaciones.
- Sistema de comentarios en publicaciones.
- Gestión de categorías (sólo el administrador puede crear, actualizar o eliminar).

## 📋 Requisitos previos

- Node.js (v18 o superior).
- MongoDB (en local o en la nube).
- Postman (para probar las rutas, opcional).

## 🚀 Instalación y ejecución

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu_usuario/opinion-manager.git
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Configura las variables de entorno:

   Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

   ```env
   MONGO_URI=tu_conexion_de_mongodb
   JWT_SECRET=tu_secreto_para_tokens
   PORT=3001
   ```

4. Ejecuta el servidor:

   ```bash
   npm start
   ```

   El servidor estará disponible en: `http://localhost:3001`

## 📊 Endpoints disponibles

### 🔒 Autenticación

1. **Registrar usuario**

   **POST** `/opinionManager/v1/auth/register`

   **Body (form-data):**

   - `name`: Nombre del usuario
   - `surname`: Apellido
   - `username`: Nombre de usuario
   - `email`: Correo electrónico
   - `password`: Contraseña
   - `profilePicture`: Imagen de perfil (archivo)
   - `phone`: Teléfono

2. **Iniciar sesión**

   **POST** `/opinionManager/v1/auth/login`

   **Body (JSON):**

   ```json
   {
     "username": "Dev10",
     "password": "12345678"
   }
   ```

### 👤 Usuario

1. **Actualizar contraseña**

   **PATCH** `/opinionManager/v1/user/updatePassword`

   **Body (JSON):**

   ```json
   {
     "oldPassword": "12345678",
     "newPassword": "123456789"
   }
   ```

2. **Actualizar imagen de perfil**

   **PATCH** `/opinionManager/v1/user/updateProfilePicture`

   **Body (form-data):**

   - `profilePicture`: Nueva imagen de perfil (archivo)

3. **Actualizar usuario**

   **PUT** `/opinionManager/v1/user/updateUser`

   **Body (JSON):**

   ```json
   {
     "name": "Nuevo Nombre",
     "username": "NuevoUsername",
     "phone": "12345678"
   }
   ```

### 📚 Categorías (requiere token de administrador)

1. **Agregar categoría**

   **POST** `/opinionManager/v1/category/addCategory`

   **Body (JSON):**

   ```json
   {
     "nameCategory": "Literatura",
     "descriptionCategory": "Libros"
   }
   ```

2. **Listar categorías**

   **GET** `/opinionManager/v1/category/`

3. **Actualizar categoría**

   **PUT** `/opinionManager/v1/category/updateCategory/:id`

   **Body (JSON):**

   ```json
   {
     "descriptionCategory": "Nueva descripción"
   }
   ```

4. **Eliminar categoría**

   **DELETE** `/opinionManager/v1/category/deleteCategory/:id`

### 📝 Publicaciones

1. **Agregar publicación**

   **POST** `/opinionManager/v1/publication/addPublication`

   **Body (JSON):**

   ```json
   {
     "title": "Título de la publicación",
     "keeper": "Categoría",
     "textPublication": "Contenido de la publicación"
   }
   ```

2. **Listar publicaciones**

   **GET** `/opinionManager/v1/publication/`

3. **Actualizar publicación**

   **PUT** `/opinionManager/v1/publication/updatePublication/:id`

   **Body (JSON):**

   ```json
   {
     "title": "Nuevo título",
     "textPublication": "Nuevo contenido"
   }
   ```

4. **Eliminar publicación**

   **DELETE** `/opinionManager/v1/publication/deletePublication/:id`

### 💬 Comentarios

1. **Agregar comentario a una publicación**

   **POST** `/opinionManager/v1/comment/addComment`

   **Body (JSON):**

   ```json
   {
     "publicationId": "id_de_la_publicacion",
     "textComment": "Este es un comentario"
   }
   ```

2. **Listar comentarios de una publicación**

   **GET** `/opinionManager/v1/comment/:publicationId`

3. **Actualizar comentario**

   **PUT** `/opinionManager/v1/comment/updateComment/:id`

   **Body (JSON):**

   ```json
   {
     "textComment": "Comentario actualizado"
   }
   ```

4. **Eliminar comentario**

   **DELETE** `/opinionManager/v1/comment/deleteComment/:id`

## 🧪 Pruebas con Postman

1. Importa la colección de Postman desde el archivo proporcionado o agrega los endpoints manualmente.
2. Asegúrate de incluir el token de autenticación en las rutas protegidas (Bearer Token).

## 📌 Notas adicionales

- El sistema cuenta con validación de datos y manejo de errores.
- Solo un administrador puede gestionar las categorías.
- El ID del usuario se obtiene del token y no debe enviarse en el cuerpo de las solicitudes.


