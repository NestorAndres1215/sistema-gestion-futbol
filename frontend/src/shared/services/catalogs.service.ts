import { api } from "./api-client";

/* =========================
   CATEGORÍA ÁRBITROS
========================= */

export const getCategoriaArbitros = async () => {
  const response = await api.get("/catalogs/categoria-arbitros");
  return response;
};

export const getEspecialidadArbitro = async () => {
  const response = await api.get("/catalogs/especialidad-arbitro");
  return response;
};

/* =========================
   CONFEDERACIONES
========================= */

export const getConfederaciones = async () => {
  const response = await api.get("/catalogs/confederaciones");
  return response;
};

/* =========================
   ESTADOS
========================= */

export const getEstado = async () => {
  const response = await api.get("/catalogs/estado");
  return response;
};

export const getEstadoEstadio = async () => {
  const response = await api.get("/catalogs/estado-estadio");
  return response;
};

export const getEstadoGenerico = async () => {
  const response = await api.get("/catalogs/estado-generico");
  return response;
};

/* =========================
   JUEGO
========================= */

export const getEstiloJuego = async () => {
  const response = await api.get("/catalogs/estilo-juego");
  return response;
};

export const getPieDominante = async () => {
  const response = await api.get("/catalogs/pie-dominante");
  return response;
};

/* =========================
   GENEROS
========================= */

export const getGeneros = async () => {
  const response = await api.get("/catalogs/generos");
  return response;
};

/* =========================
   ENTRENADORES
========================= */

export const getLicenciasEntrenador = async () => {
  const response = await api.get("/catalogs/licencias-entrenador");
  return response;
};

/* =========================
   TORNEOS
========================= */

export const getTipoTorneo = async () => {
  const response = await api.get("/catalogs/tipo-torneo");
  return response;
};

/* =========================
   CANCHA
========================= */

export const getTipoCesped = async () => {
  const response = await api.get("/catalogs/tipo-cesped");
  return response;
};

/* =========================
   DATOS GENÉRICOS
========================= */

export const getTipoDato = async () => {
  const response = await api.get("/catalogs/tipo-dato");
  return response;
};