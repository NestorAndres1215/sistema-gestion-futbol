import Swal from "sweetalert2";

export const SwalTheme = Swal.mixin({
  background: "#13161e",
  color: "#f0f4f8",

  confirmButtonColor: "#34d399",
  cancelButtonColor: "#6b7280",

  customClass: {
    popup: "swal-dark-popup",
    title: "swal-title",
    htmlContainer: "swal-text",
    confirmButton: "swal-btn-confirm",
    cancelButton: "swal-btn-cancel"
  }
});