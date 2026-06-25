(function () {
  const tests = document.querySelectorAll('.popup_test form');

  tests.forEach((form) => {
    const steps = form.querySelectorAll('.test__step');
    const currentEl = form.querySelector('.test__current');
    const totalEl = form.querySelector('.test__total');
    const btnBack = form.querySelector('.test__btn_back');
    const btnNext = form.querySelector('.test__btn_next');
    const btnSubmit = form.querySelector('.test__btn_submit');

    let currentStepIndex = 0;
    const totalSteps = steps.length;

    function updateUI() {
      // Показываем только текущий шаг, остальные скрываем
      steps.forEach((step, idx) => {
        step.hidden = idx !== currentStepIndex;
      });

      // Обновляем пагинацию
      if (currentEl) currentEl.textContent = String(currentStepIndex + 1);
      if (totalEl) totalEl.textContent = String(totalSteps);

      const isFirst = currentStepIndex === 0;
      const isLast = currentStepIndex === totalSteps - 1;
      const hasOnlyOneStep = totalSteps === 1;

      // Кнопка «Назад»
      if (btnBack) {
        btnBack.disabled = isFirst || hasOnlyOneStep;
        btnBack.hidden = hasOnlyOneStep;
      }

      // Кнопка «Следующий вопрос»
      if (btnNext) {
        const stepFilled = checkStepFilled(currentStepIndex);
        btnNext.hidden = isLast || hasOnlyOneStep;
        btnNext.disabled = !stepFilled;
      }

      // Кнопка «Узнать результат»
      if (btnSubmit) {
        const allStepsFilled = checkAllStepsFilled();
        btnSubmit.disabled = !allStepsFilled;
        btnSubmit.hidden = !isLast;
      }
    }

    function checkStepFilled(index) {
      const step = steps[index];
      const inputs = step.querySelectorAll('.checkbox__input');
      if (!inputs.length) return false;

      const radios = Array.from(inputs).filter((i) => i.type === 'radio');
      const checkboxes = Array.from(inputs).filter((i) => i.type === 'checkbox');

      const radioFilled = radios.length === 0 || radios.some((r) => r.checked);
      const checkboxFilled = checkboxes.length === 0 || checkboxes.some((c) => c.checked);

      return radioFilled && checkboxFilled;
    }

    function checkAllStepsFilled() {
      for (let i = 0; i < totalSteps; i++) {
        if (!checkStepFilled(i)) return false;
      }
      return true;
    }

    updateUI();

    form.addEventListener('click', (e) => {
      const targetButton = e.target.closest('button');
      if (!targetButton) return;

      if (targetButton === btnNext) {
        if (currentStepIndex < totalSteps - 1 && checkStepFilled(currentStepIndex)) {
          currentStepIndex++;
          updateUI();
        }
      }

      if (targetButton === btnBack) {
        if (currentStepIndex > 0) {
          currentStepIndex--;
          updateUI();
        }
      }
    });

    // Пересчитываем видимость кнопки «Узнать результат» при изменении ответов
    form.addEventListener('change', () => {
      updateUI();
    });
  });
})();
