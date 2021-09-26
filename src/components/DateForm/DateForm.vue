<template>
  <form class="form" @submit.prevent="submitForm">
    <custom-select
      :areOptionsReversed="false"
      :isInvalid="!validity.specificValidity.date && triggered"
      :limits="{ from: 1, to: numberOfDays }"
      v-model="date"
      @update:modelValue="setSelectedDate"
      placeholderText="День"
      name="date"
    ></custom-select>
    <custom-select
      :areOptionsReversed="false"
      :isInvalid="!validity.specificValidity.month && triggered"
      :limits="{ from: 0, to: 11 }"
      v-model="month"
      @update:modelValue="setSelectedDate"
      placeholderText="Месяц"
      name="month"
      :formatOptionText="getMonthName"
    ></custom-select>
    <custom-select
      :areOptionsReversed="true"
      :isInvalid="!validity.specificValidity.year && triggered"
      :limits="{ from: 1920, to: new Date().getFullYear() }"
      v-model="year"
      @update:modelValue="setSelectedDate"
      placeholderText="Год"
      name="year"
    ></custom-select>
    <primary-button :offset="0" type="submit">Далее</primary-button>
  </form>
</template>

<script>
import CustomSelect from "./CustomSelect.vue";
import PrimaryButton from "./../UI/PrimaryButton.vue";

export default {
  components: {
    CustomSelect,
    PrimaryButton,
  },
  props: {
    submitHandler: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      date: null,
      month: null,
      year: null,
      triggered: false,
      counterValid: 0,
    };
  },
  watch: {
    validity: {
      handler() {
        if (this.validity.isValid && this.calculatedDate.getDate() !== this.date) {
        this.date = 1;
      }
      },
      deep:true
    }
  },
  computed: {
    validity() {
      const isDateValid = this.date !== null,
        isMonthValid = this.month !== null,
        isYearValid = this.year !== null;
      const isValid = isDateValid && isMonthValid && isYearValid;

      return {
        specificValidity: {
          date: isDateValid,
          month: isMonthValid,
          year: isYearValid,
        },
        isValid,
      };
    },
    calculatedDate() {
      if (this.validity.isValid) {
        return new Date(this.year, this.month, this.date);
      } else {
        return null;
      }
    },
    numberOfDays() {
      if (this.calculatedDate) {
        const nextMonth =
          this.calculatedDate.getMonth() + 1 > 11
            ? 0
            : this.calculatedDate.getMonth() + 1;
        const intermediateDate = new Date(
          this.calculatedDate.getFullYear(),
          nextMonth
        );
        intermediateDate.setDate(0);
        return intermediateDate.getDate();
      } else {
        return 30;
      }
    },
  },
  methods: {
    setSelectedDate(value, propName) {
      this[propName] = value;
    },
    getMonthName(monthNumber) {
      return new Date(1970, monthNumber).toLocaleString("ru-RU", {
        month: "long",
      });
    },
    submitForm() {
      this.triggered = true;
      if (this.validity.isValid) {
        this.submitHandler(this.calculatedDate);
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "./../../styles/module-bundle.scss";
.form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
