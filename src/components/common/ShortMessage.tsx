import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2300,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
  customClass: {
    container: "swal_container",
  },
});

const ShowShortMessage = (title: string, icon: any = "success") => {
  return Toast.fire({
    padding: "25px",
    icon: icon,
    title,
  });
};

export default ShowShortMessage;
