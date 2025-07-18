document.addEventListener("DOMContentLoaded", function() {
  const step1 = document.getElementById('step1');
  const step2 = document.getElementById('step2');
  const thankYou = document.getElementById('thankYou');
  const toStep2 = document.getElementById('toStep2');
  const backToStep1 = document.getElementById('backToStep1');

  
  // Step 1: Enable/disable the Next button based on required fields
  function updateNextButtonState() {
    // Only enable if Step 1 is valid
    if (step1.checkValidity()) {
      toStep2.disabled = false;
      toStep2.classList.remove('bg-gray-400', 'cursor-not-allowed');
      toStep2.classList.add('bg-blue-600', 'hover:bg-blue-700', 'cursor-pointer');
    } else {
      toStep2.disabled = true;
      toStep2.classList.add('bg-gray-400', 'cursor-not-allowed');
      toStep2.classList.remove('bg-blue-600', 'hover:bg-blue-700', 'cursor-pointer');
    }
  }

  // Initial state
  updateNextButtonState();

  // Re-check validity on user input in any Step 1 field
  step1.addEventListener('input', updateNextButtonState);
  step1.addEventListener('change', updateNextButtonState);

  toStep2.onclick = function() {
    setTimeout(function() {
  if (window.hcaptcha) {
    hcaptcha.render('hcaptcha-widget', {
      sitekey: '8552fe00-e27a-49de-a402-7d3c8d5ce89c',
      callback: enableSubmit,
      'expired-callback': disableSubmit,
      'chalexpired-callback': disableSubmit,
      'error-callback': disableSubmit
    });
  }
}, 10);
    if (step1.checkValidity()) {
      // Copy fields from Step 1 as hidden inputs in Step 2
      function setHidden(name, value) {
        let field = document.getElementById('hidden_' + name);
        if (!field) {
          field = document.createElement('input');
          field.type = 'hidden';
          field.name = name;
          field.id = 'hidden_' + name;
          step2.appendChild(field);
        }
        field.value = value;
      }
      setHidden('name', document.getElementById('name').value);
      setHidden('email', document.getElementById('email').value);
      setHidden('WXWA', document.getElementById('WXWA').value);
      setHidden('available_time_1', document.getElementById('available-time-1').value);
      setHidden('available_time_2', document.getElementById('available-time-2').value);
      setHidden('available_time_3', document.getElementById('available-time-3').value);

      step1.classList.add('hidden');
      step2.classList.remove('hidden');

       if (!document.getElementById('hcaptcha-widget')) {
      const captchaDiv = document.createElement('div');
      captchaDiv.id = 'hcaptcha-widget';
      const btnRow = step2.querySelector('.flex.justify-between.mt-3');
      step2.insertBefore(captchaDiv, btnRow);

      setTimeout(function() {
        if (window.hcaptcha) {
          hcaptcha.render('hcaptcha-widget', {
            sitekey: '8552fe00-e27a-49de-a402-7d3c8d5ce89c',
            callback: enableSubmit,
            'expired-callback': disableSubmit,
            'chalexpired-callback': disableSubmit,
            'error-callback': disableSubmit
          });
        }
      }, 0);
    }
    } else {
      step1.reportValidity();
    }
    
  };

  backToStep1.onclick = function() {
    step2.classList.add('hidden');
    step1.classList.remove('hidden');
  };

  // Set min for date/time fields
  const now = new Date();
  const pad = n => n.toString().padStart(2, '0');
  const minDateTime = now.getFullYear() + '-' +
    pad(now.getMonth()+1) + '-' +
    pad(now.getDate()) + 'T' +
    pad(now.getHours()) + ':' +
    pad(now.getMinutes());
  document.getElementById('available-time-1').min = minDateTime;
  document.getElementById('available-time-2').min = minDateTime;
  document.getElementById('available-time-3').min = minDateTime;

  // If you are using AJAX, leave this preventDefault; for normal submit, remove e.preventDefault()
  step2.onsubmit = function(e) {
    e.preventDefault(); // Prevent normal submission

    // Create form data to send
    const formData = new FormData(step2);

    // Send with fetch (AJAX)
    fetch(step2.action, {
      method: 'POST',
      body: formData
    })
    .then(response => response.text())
    .then(data => {
      // You can check "data" for a success message if needed
      step2.classList.add('hidden');
      thankYou.classList.remove('hidden');
    })
    .catch(() => {
      alert('Submission failed. Please try again.');
    });
  };
});
function enableSubmit() {
  // Enable the submit button when hCaptcha is solved
  document.getElementById('submitButton').disabled = false;
  // Optionally, update styling
  document.getElementById('submitButton').classList.remove('bg-gray-400', 'cursor-not-allowed');
  document.getElementById('submitButton').classList.add('bg-blue-600', 'hover:bg-blue-700', 'cursor-pointer');
}

// (Optional Best Practice) - Disable again if captcha is expired or reset:
function disableSubmit() {
  document.getElementById('submitButton').disabled = true;
  document.getElementById('submitButton').classList.add('bg-gray-400', 'cursor-not-allowed');
  document.getElementById('submitButton').classList.remove('bg-blue-600', 'hover:bg-blue-700', 'cursor-pointer');
}
