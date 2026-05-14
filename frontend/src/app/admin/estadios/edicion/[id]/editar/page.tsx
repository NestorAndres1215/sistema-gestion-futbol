"use client";

import useEstadioEdit from "@/features/estadio/hooks/useEstadioEdit";
import AdminLayout from "@/shared/components/layout/admin/layout";
import Breadcrumb from "@/shared/components/ui/bread-crumb/bread-cumb";
import styles from "@/shared/styles/editar.module.css";
import { useRouter } from "next/navigation";
import ActionButton from "@/shared/components/ui/button/button";

export default function EstadioEditarPage() {
  const router = useRouter();

  const {
    form,
    handleChange,
    actualizarEstadio,
    handleFotoChange,
    fotoPreview,
  } = useEstadioEdit();


  return (
    <AdminLayout>
      <Breadcrumb
        items={[
          { label: "Estadios", href: "/admin/estadios" },
          { label: "Edición", href: "/admin/estadios" },
          { label: "Editar" },
        ]}
      />

      <div className={styles.layout}>

        <div className={styles.card}>
          <div className={styles.cardHead}>
            <p className={styles.cardName}>Foto del Estadio</p>
          </div>
          <div className={styles.photoWrap}>
            <img
              src={
                fotoPreview
                  ? fotoPreview.startsWith("blob:")
                    ? fotoPreview
                    : fotoPreview.startsWith("http")
                      ? fotoPreview
                      : `https://localhost:7269${fotoPreview.startsWith("/") ? "" : "/"}${fotoPreview}`
                  : "/placeholder.png"
              }
              alt="foto estadio"
              className={styles.photo}
            />
          </div>
          <div className={styles.photoField}>
            <div className={styles.inputWrap}>
              <input
                type="file"
                accept="image/*"
                className={styles.input}
                onChange={(e) => {
                  if (e.target.files?.[0]) handleFotoChange(e.target.files[0]);
                }}
              />
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHead}>
            <p className={styles.cardName}>Editar Estadio</p>
          </div>

          <form noValidate  className="d-flex flex-column gap-3 p-3 p-md-4">

            <div className="row g-3">

              <div className="col-12 col-md-6">
                <div className={styles.field}>
                  <label className={styles.label}>Nombre</label>

                  <div className={styles.inputWrap}>
                    <input
                      placeholder="Nombre del estadio"
                      value={form.nombre}
                      onChange={(e) =>
                        handleChange("nombre", e.target.value)
                      }
                      className={styles.input}
                    />
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className={styles.field}>
                  <label className={styles.label}>Ciudad</label>

                  <div className={styles.inputWrap}>
                    <input
                      placeholder="Ciudad"
                      value={form.ciudad}
                      onChange={(e) =>
                        handleChange("ciudad", e.target.value)
                      }
                      className={styles.input}
                    />
                  </div>
                </div>
              </div>

            </div>

            <div className={styles.field}>
              <label className={styles.label}>Descripción</label>
              <div className={styles.inputWrap}>
                <textarea
                  placeholder="Descripción del estadio..."
                  value={form.descripcion}
                  onChange={(e) => handleChange("descripcion", e.target.value)}
                  className={styles.input}
                  rows={3}
                />
              </div>
            </div>

            <div className="row g-3">

              <div className="col-12 col-md-6">
                <div className={styles.field}>
                  <label className={styles.label}>País</label>

                  <div className={styles.inputWrap}>
                    <input
                      placeholder="País"
                      value={form.pais}
                      onChange={(e) =>
                        handleChange("pais", e.target.value)
                      }
                      className={styles.input}
                    />
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className={styles.field}>
                  <label className={styles.label}>Capacidad</label>

                  <div className={styles.inputWrap}>
                    <input
                      placeholder="Capacidad"
                      type="number"
                      value={form.capacidad}
                      onChange={(e) =>
                        handleChange("capacidad", e.target.value)
                      }
                      className={styles.input}
                    />
                  </div>
                </div>
              </div>

            </div>

            <div className="row g-3">

              <div className="col-12 col-md-6">
                <div className={styles.field}>
                  <label className={styles.label}>
                    Fecha Apertura
                  </label>

                  <div className={styles.inputWrap}>
                    <input
                      type="date"
                      value={form.fechaApertura}
                      onChange={(e) =>
                        handleChange(
                          "fechaApertura",
                          e.target.value
                        )
                      }
                      className={styles.input}
                    />
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className={styles.field}>
                  <label className={styles.label}>Año</label>

                  <div className={styles.inputWrap}>
                    <input
                      placeholder="Año"
                      type="number"
                      value={form.anio}
                      onChange={(e) =>
                        handleChange("anio", e.target.value)
                      }
                      className={styles.input}
                    />
                  </div>
                </div>
              </div>

            </div>

            <div className={styles.field}>
              <label className={styles.label}>Tipo de Césped</label>
              <div className={styles.inputWrap}>
                <input
                  placeholder="Tipo de césped"
                  value={form.tipoCesped}
                  onChange={(e) => handleChange("tipoCesped", e.target.value)}
                  className={styles.input}
                />
              </div>
            </div>

            <div className="row g-3">

              <div className="col-12 col-md-6">
                <div className={styles.field}>
                  <label className={styles.label}>Latitud</label>

                  <div className={styles.inputWrap}>
                    <input
                      placeholder="Latitud"
                      value={form.latitud}
                      onChange={(e) =>
                        handleChange("latitud", e.target.value)
                      }
                      className={styles.input}
                    />
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className={styles.field}>
                  <label className={styles.label}>Longitud</label>

                  <div className={styles.inputWrap}>
                    <input
                      placeholder="Longitud"
                      value={form.longitud}
                      onChange={(e) =>
                        handleChange("longitud", e.target.value)
                      }
                      className={styles.input}
                    />
                  </div>
                </div>
              </div>

            </div>
            <div className="row g-2 mt-3">

              <div className="col-12 col-sm-6">
                <ActionButton mode="cancelar" onClick={() => router.back()} />
              </div>

              <div className="col-12 col-sm-6">
                <ActionButton mode="update" onClick={actualizarEstadio} />
              </div>

            </div>

          </form>
        </div>

      </div>
    </AdminLayout>
  );
}