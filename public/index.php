<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>UNAH Página Principal</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

</head>

<body>
    <!-- Barra de navegación mejorada con Bootstrap -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">
                <img src="./assets/img/logo-unah-blanco.png" alt="Logo Universidad" width="120" height="70" class="d-inline-block align-top">
            </a>
            
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                <span class="navbar-toggler-icon"></span>
            </button>
            
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                            Estudiantes
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="./views/admissions/forms.html">Admisiones</a></li>
                            <li><a class="dropdown-item" href="#">Oferta Académica</a></li>
                            <li><a class="dropdown-item" href="#">Matrícula</a></li>
                        </ul>
                    </li>
                    
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                            Servicios
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Servicios Académicos</a></li>
                            <li><a class="dropdown-item" href="/views/library/index.html">Servicios de Biblioteca</a></li>
                        </ul>
                    </li>
                    
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                            Registro
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Estudiantes</a></li>
                            <li><a class="dropdown-item" href="#">Profesores</a></li>
                            <li><a class="dropdown-item" href="#">Jefes de departamento</a></li>
                            <li><a class="dropdown-item" href="#">Coordinadores de carrera</a></li>
                            <li><a class="dropdown-item" href="#">Dirección académica</a></li>
                        </ul>
                    </li>
                    
                    <li class="nav-item">
                        <a class="nav-link" href="#">Campus Virtual</a>
                    </li>
                </ul>
                
                <form class="d-flex">
                    <input class="form-control me-2" type="search" placeholder="Buscar">
                    <button class="btn btn-outline-light" type="submit">Buscar</button>
                </form>
            </div>
        </div>
    </nav>
    
    <!-- Contenido principal con Bootstrap -->
    <main class="container my-5">
        <div class="row">
            <div class="col-md-8 mx-auto text-center">
                <h1 class="display-4 text-primary mb-4">Bienvenidos a la UNAH</h1>
                <p class="lead">Una institución comprometida con la excelencia académica, la investigación innovadora y la formación integral de profesionales líderes para el futuro.</p>
                <p>Explora nuestras carreras, conoce nuestra comunidad y descubre todo lo que tenemos para ofrecerte.</p>
                
                <div class="mt-5">
                    <div class="row g-4">
                        <div class="col-md-4">
                            <div class="card h-100">
                                <div class="card-body">
                                    <h5 class="card-title">Oferta Académica</h5>
                                    <p class="card-text">Conoce nuestras carreras y programas de estudio.</p>
                                    <a href="#" class="btn btn-primary">Ver más</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card h-100">
                                <div class="card-body">
                                    <h5 class="card-title">Admisiones</h5>
                                    <p class="card-text">Proceso de ingreso a la universidad.</p>
                                    <a href="#" class="btn btn-primary">Ver más</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card h-100">
                                <div class="card-body">
                                    <h5 class="card-title">Campus Virtual</h5>
                                    <p class="card-text">Accede a nuestros recursos educativos en línea.</p>
                                    <a href="#" class="btn btn-primary">Ingresar</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>


    <iframe src="http://localhost:3000/api/virtualLibrary/get/book" frameborder="0"></iframe>
    
    <!-- Pie de página con Bootstrap -->
    <footer class="bg-dark text-white py-4 mt-5">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <h5>Universidad Nacional Autónoma de Honduras</h5>
                    <p>Institución líder en educación superior en Honduras.</p>
                </div>
                <div class="col-md-3">
                    <h5>Contacto</h5>
                    <ul class="list-unstyled">
                        <li>Teléfono: +504 2216-6100</li>
                        <li>Email: info@unah.edu.hn</li>
                    </ul>
                </div>
                <div class="col-md-3">
                    <h5>Enlaces rápidos</h5>
                    <ul class="list-unstyled">
                        <li><a href="#" class="text-white">Biblioteca</a></li>
                        <li><a href="#" class="text-white">Calendario académico</a></li>
                        <li><a href="#" class="text-white">Noticias</a></li>
                    </ul>
                </div>
            </div>
            <hr>
            <div class="text-center">
                <p class="mb-0">&copy; 2025 Universidad Nacional Autónoma de Honduras. Todos los derechos reservados.</p>
            </div>
        </div>
    </footer>



    

    <!-- Bootstrap JS y dependencias -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <!-- Scripts personalizados -->
    
</body>
</html>
