<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <button
            class="close-button"
            @click.prevent="$emit('close')"
            v-text="'X'"
          ></button>

          <slot name="modal-header"></slot>
        </div>
        <div class="modal-body">
          <slot name="modal-body">
            <button
              class="modal-default-button"
              @click="$emit('close')"
              v-text="'Ok'"
            ></button>
          </slot>
        </div>
        <slot name="modal-footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}
.modal-header {
  display: flex;
}
.modal-header .close-button {
  margin-left: auto;
  background-color: transparent;
  font-weight: 600;
  border: none;
  opacity: 0.7;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-footer {
  display: flex;
}

.modal-default-button {
  margin-left: auto;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>