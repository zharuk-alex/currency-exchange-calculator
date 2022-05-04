<template>
  <div
    class="modal fade"
    :id="ID"
    tabindex="-1"
    role="dialog"
    aria-hidden="false"
  >
    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 v-if="hasSlot('modal-title')" class="modal-title">
            <slot name="modal-title"></slot>
          </h5>
          <button
            @click="hideModal()"
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div v-if="hasSlot('modal-body')" class="modal-body">
          <slot name="modal-body"></slot>
        </div>
        <div v-if="hasSlot('modal-footer')" class="modal-footer">
          <slot name="modal-footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";

export default {
  name: "ModalDialog",
  setup(props, { slots }) {
    const hasSlot = (name) => !!slots[name];
    return { hasSlot };
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    modalContainer: null,
  }),
  computed: {
    ID: () => `modal_${Date.now()}`,
  },
  mounted() {
    this.initBSModal();
  },
  methods: {
    initBSModal() {
      this.modalContainer = document.getElementById(this.ID);
      this.cpModal = new Modal(this.modalContainer, null);
      this.escapeEventListener();
      this.modalContainer.addEventListener("hidden.bs.modal", () => {
        this.$emit("update:visible", false);
      });
    },
    showModal() {
      this.cpModal.show();
    },
    hideModal() {
      this.$emit("update:visible", false);
    },
    escapeEventListener() {
      document.addEventListener("keydown", (e) => {
        const key = e.key || e.keyCode;
        if (key === "Escape" || key === "Esc" || key === 27) {
          e.preventDefault();
          this.hideModal();
        }
      });
    },
  },
  watch: {
    visible(val) {
      val ? this.cpModal.show() : this.cpModal.hide();
    },
  },
};
</script>

