<template>
  <div class="jumbotron">
    <div class="container">
      <div class="row">
        <div class="col-sm-8 offset-sm-2">
          <div>
            <h3>Panel tworzenia zlecenia lekowego dla pacjenta</h3>
            <form @submit.prevent="handleSubmit">
              <p>Informacje o leku</p>
              <div class="form-group">
<!--                name-->
                <label for="medication_name">Nazwa</label>
                <select v-model="form.medicine.name" id="medication_name" class="form-control" :class="{ 'is-invalid': submitted && $v.form.medicine.name.$error }">
                  <option disabled selected>Wybierz</option>
                  <option value="avifavir">avifavir</option>
                  <option value="abakawir">abakawir</option>
                  <option value="abasaglar">abasaglar</option>
                  <option value="abelcyt">abelcyt</option>
                  <option value="abe">abe</option>
                </select>
                <div v-if="submitted && !$v.form.medicine.name.required" class="invalid-feedback">Pole nazwa jest wymagane</div>
              </div>
<!--              hour-->
              <div class="form-group">
                <label>Godzina podania</label>
                <div class="custom-control custom-radio">
                  <input type="radio" v-model="form.medicine.hour" id="8:00" value="8:00" class="custom-control-input" :class="{ 'is-invalid': submitted && $v.form.medicine.hour.$error }" />
                  <label class="custom-control-label" for="8:00">8:00</label>
                </div>
                <div class="custom-control custom-radio">
                  <input type="radio" v-model="form.medicine.hour" id="15:00" value="15:00" class="custom-control-input" :class="{ 'is-invalid': submitted && $v.form.medicine.hour.$error }" />
                  <label class="custom-control-label" for="15:00">15:00</label>
                </div>
                <div class="custom-control custom-radio">
                  <input type="radio" v-model="form.medicine.hour" id="22:00" value="22:00" class="custom-control-input" :class="{ 'is-invalid': submitted && $v.form.medicine.hour.$error }" />
                  <label class="custom-control-label" for="22:00">22:00</label>
                </div>
                <div v-if="submitted && !$v.form.medicine.hour.required" class="invalid-feedback">Pole godzina podania jest wymagane</div>
              </div>
<!--              date-->
              <div class="form-group">
                <label for="medicine_date">Data podania</label>
                <input type="date" v-model="form.medicine.date" id="medicine_date" class="form-control" :class="{ 'is-invalid': submitted && $v.form.medicine.date.$error }" />
                <div v-if="submitted && !$v.form.medicine.date.required" class="invalid-feedback">Pole data podania jest wymagane</div>
              </div>
<!--              quantity-->
              <div class="form-group">
                <label for="medicine_quantity">Ilość w tabletkach</label>
                <input type="number" v-model="form.medicine.quantity" id="medicine_quantity" class="form-control" :class="{ 'is-invalid': submitted && $v.form.medicine.quantity.$error }" />
                <div v-if="submitted && !$v.form.medicine.quantity.required" class="invalid-feedback">Pole ilość jest wymagane</div>
              </div>
<!--              section-->
              <div class="form-group">
                <label for="medication_section">Oddział</label>
                <select v-model="form.medicine.section" id="medication_section" class="form-control" :class="{ 'is-invalid': submitted && $v.form.medicine.section.$error }">
                  <option disabled selected>Wybierz</option>
                  <option value="oddzial a">oddział A</option>
                  <option value="oddzial b">oddział B</option>
                  <option value="oddzial c">oddział C</option>
                </select>
                <div v-if="submitted && !$v.form.medicine.section.required" class="invalid-feedback">Pole oddział jest wymagane</div>
              </div>
              <p>Dane pacjenta</p>
<!--              pacient name-->
              <div class="form-group">
                <label for="pacient_name">Imię</label>
                <input type="text" v-model="form.pacient.name" id="pacient_name" class="form-control" :class="{ 'is-invalid': submitted && $v.form.pacient.name.$error }" />
                <div v-if="submitted && !$v.form.pacient.name.required" class="invalid-feedback">Pole imię jest wymagane</div>
              </div>
<!--              pacient surname-->
              <div class="form-group">
                <label for="pacient_surname">Nazwisko</label>
                <input type="text" v-model="form.pacient.surname" id="pacient_surname" class="form-control" :class="{ 'is-invalid': submitted && $v.form.pacient.surname.$error }" />
                <div v-if="submitted && !$v.form.pacient.surname.required" class="invalid-feedback">Pole nazwisko jest wymagane</div>
              </div>
<!--              pacient pesel-->
              <div class="form-group">
                <label for="pacient_pesel">PESEL</label>
                <input type="text" v-model="form.pacient.pesel" id="pacient_pesel" class="form-control" :class="{ 'is-invalid': submitted && $v.form.pacient.pesel.$error }" />
                <div v-if="submitted && $v.form.pacient.pesel.$error" class="invalid-feedback">
                  <span v-if="!$v.form.pacient.pesel.required">Pole PESEL jest wymagane</span>
                  <span v-else-if="!$v.form.pacient.pesel.isValidPesel">PESEL nie jest poprawny</span>
                </div>
              </div>
              <div class="form-group">
                <button type="submit" class="btn btn-primary" style="margin-right: 5px">Wyślij</button>
                <button type="reset" class="btn btn-primary">Resetuj</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { required } from "vuelidate/lib/validators";
  import { isValidPesel } from "./isValidPesel.js"


  export default {
    name: "app",
    data() {
      return {
        form: {
          medicine: {
            name: null,
            hour: null,
            date: null,
            quantity: null,
            section: null,
          },
          pacient: {
            name: null,
            surname: null,
            pesel: null
          },
        },
        submitted: false
      };
    },
    validations: {
      form: {
        medicine: {
          name: { required },
          hour: { required },
          date: { required },
          quantity: { required },
          section: { required },
        },
        pacient: {
          name: { required },
          surname: { required },
          pesel: { required, isValidPesel }
        },
      },
    },
    methods: {
      handleSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        this.$v.$touch();
        if (this.$v.$invalid) {
          return;
        }
        console.log(this.form);
        alert("Sukces. \n\n W konsoli są wysłane dane");
      }
    }
  };
</script>
