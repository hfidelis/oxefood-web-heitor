import { toast } from "react-toastify";

class Notify {
    position = "top-center";

    default(msg) {
        toast(msg, { position: this.position })
    }

    info(msg) {
        toast.info(msg, { position: this.position })
    }

    warn(msg) {
        toast.warn(msg, { position: this.position })
    }

    success(msg) {
        toast.success(msg, { position: this.position })
    }

    error(msg) {
        toast.error(msg, { position: this.position })
    }
}

const notify = new Notify();

export default notify;
