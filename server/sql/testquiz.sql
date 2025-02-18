INSERT INTO quizzes (title, description) 
VALUES ('Animal Test Quiz', 'Test your knowledge with animals!');

INSERT INTO questions (quiz_id, question_text, question_type) 
VALUES 
(1, 'How many legs does a dog have?', 'multiple-choice'),
(1, 'What do you get if you add 1 cow + 1 cow?', 'open-ended'),
(1, 'Which animal is the fastest on land?', 'multiple-choice'),
(1, 'How many hearts does an octopus have?', 'multiple-choice'),
(1, 'Which animal is known for its long neck?', 'multiple-choice');

INSERT INTO answer_options (question_id, quiz_id, answer_text, is_correct) 
VALUES 
(1, 1, '4 legs', TRUE), 
(1, 1, '2 legs', FALSE),
(1, 1, '6 legs', FALSE),
(1, 1, '8 legs', FALSE),
(3, 1, 'Cheetah', TRUE),
(3, 1, 'Lion', FALSE),
(3, 1, 'Elephant', FALSE),
(3, 1, 'Gazelle', FALSE),
(4, 1, '1 heart', FALSE),
(4, 1, '3 hearts', FALSE),
(4, 1, '4 hearts', TRUE),
(4, 1, '2 hearts', FALSE),
(5, 1, 'Giraffe', TRUE),
(5, 1, 'Elephant', FALSE),
(5, 1, 'Cow', FALSE),
(5, 1, 'Panda', FALSE);

INSERT INTO correct_answers (question_id, correct_answer_text)
VALUES 
(2, '2 cows'); 

