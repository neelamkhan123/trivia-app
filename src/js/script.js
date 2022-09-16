$(function () {
  // Smooth Scroll
  $('a[href*="#"]')
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function (event) {
      if (
        location.pathname.replace(/^\//, '') ==
          this.pathname.replace(/^\//, '') &&
        location.hostname == this.hostname
      ) {
        var target = $(this.hash);
        target = target.length
          ? target
          : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          event.preventDefault();
          $('html, body').animate(
            {
              scrollTop: target.offset().top,
            },
            800
          );
          return false;
        }
      }
    });

  // Try Agagin Button
  $('.try-again').click(function () {
    setTimeout(() => {
      location.reload();
    }, 800);
  });

  // Reset localStorage
  $('.btn-go').click(function () {
    setTimeout(() => {
      location.reload();
    }, 800);
  });

  // Select Settings
  $('.setting').each(function () {
    $(this).on('click', function () {
      // Choose Category
      if ($(this).hasClass('category')) {
        const current1 = this.textContent;
        const category = current1.toLowerCase().split(' ').join('_');

        // Highlight Selected Setting
        $(this).addClass('btn-toggle');
        $(this)
          .closest('div')
          .find('button')
          .not(this)
          .removeClass('btn-toggle');

        // Save to localStorage
        localStorage.setItem('cat', category);
        const selectedCat = localStorage.getItem('cat');
      }

      // Choose Difficulty
      if ($(this).hasClass('difficulty')) {
        const current2 = this.textContent;
        const difficulty = current2.toLowerCase();

        // Highlight Selected Setting
        $(this).addClass('btn-toggle');
        $(this)
          .closest('div')
          .find('button')
          .not(this)
          .removeClass('btn-toggle');

        // Save to localStorage
        localStorage.setItem('diff', difficulty);
        const selectedDiff = localStorage.getItem('diff');
      }
    });
  });

  const selectedCat = localStorage.getItem('cat');
  const selectedDiff = localStorage.getItem('diff');

  // Question and Options Function
  function setQuestion(
    data,
    i,
    questionSelector,
    op1Selector,
    op2Selector,
    op3Selector,
    op4Selector
  ) {
    const question = data[i].question;
    questionSelector.text(question);

    op1Selector.text(data[i].correctAnswer);
    op2Selector.text(data[i].incorrectAnswers[0]);
    op3Selector.text(data[i].incorrectAnswers[1]);
    op4Selector.text(data[i].incorrectAnswers[2]);
  }

  // Correct Answer Function
  let i = 0;
  function correctAnswer(
    option,
    correct,
    incorrect1,
    incorrect2,
    incorrect3,
    next
  ) {
    option.each(function () {
      $(this).on('click', function () {
        correct.css({ color: 'green', border: '4px solid green' });
        incorrect1.css({ color: 'red', border: '4px solid red' });
        incorrect2.css({ color: 'red', border: '4px solid red' });
        incorrect3.css({ color: 'red', border: '4px solid red' });

        next.css('display', 'block');

        if (this.textContent === correct[0].textContent) {
          i++;
          $('.score').text(i);
          console.log(i);

          i >= 3 ? $('.emoji').text('😀') : $('.emoji').text('😢');
        }
      });
    });
  }

  // API Call: Questions w/ Answers
  function getJSON(category, difficulty) {
    $.get(
      `https://the-trivia-api.com/api/questions?categories=${category}&limit=5&difficulty=${difficulty}`,
      function (data) {
        console.log(data[0]);

        // Set Questions and Answers
        // Question 1
        setQuestion(
          data,
          0,
          $('.question-one'),
          $('.q1-4'),
          $('.q1-2'),
          $('.q1-3'),
          $('.q1-1')
        );

        correctAnswer(
          $('.options-1'),
          $('.q1-4'),
          $('.q1-2'),
          $('.q1-3'),
          $('.q1-1'),
          $('.next-1')
        );

        // Question 2
        setQuestion(
          data,
          1,
          $('.question-two'),
          $('.q2-2'),
          $('.q2-1'),
          $('.q2-3'),
          $('.q2-4')
        );

        correctAnswer(
          $('.options-2'),
          $('.q2-2'),
          $('.q2-1'),
          $('.q2-3'),
          $('.q2-1'),
          $('.next-2')
        );

        // Question 3
        setQuestion(
          data,
          2,
          $('.question-three'),
          $('.q3-1'),
          $('.q3-4'),
          $('.q3-2'),
          $('.q3-3')
        );

        correctAnswer(
          $('.options-3'),
          $('.q3-1'),
          $('.q3-4'),
          $('.q3-2'),
          $('.q3-3'),
          $('.next-3')
        );

        // Question 4
        setQuestion(
          data,
          3,
          $('.question-four'),
          $('.q4-4'),
          $('.q4-3'),
          $('.q4-2'),
          $('.q4-1')
        );

        correctAnswer(
          $('.options-4'),
          $('.q4-4'),
          $('.q4-3'),
          $('.q4-2'),
          $('.q4-1'),
          $('.next-4')
        );

        // Question 5
        setQuestion(
          data,
          4,
          $('.question-five'),
          $('.q5-1'),
          $('.q5-4'),
          $('.q5-3'),
          $('.q5-2')
        );

        correctAnswer(
          $('.options-5'),
          $('.q5-1'),
          $('.q5-4'),
          $('.q5-3'),
          $('.q5-2'),
          $('.next-5')
        );
      }
    );
  }
  getJSON(selectedCat, selectedDiff);
});
