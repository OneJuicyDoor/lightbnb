INSERT INTO users (name, email, password)
VALUES
  ('bingbong', 'bingbong@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('dingus', 'dingusses@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('herble', 'herb@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('gerbin', 'gerbin@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES
  ('2018-09-11', '2018-09-26', 1, 1),
  ('2019-01-04', '2019-02-01', 2, 2),
  ('2021-10-01', '2021-10-14', 3, 3),
  ('2028-11-11', '2011-09-26', 4, 4);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES
  (1, 1, NULL, 1, 'its bad'),
  (2, 2, NULL, 5, 'its good'),
  (3, 3, NULL, 4, 'its decent'),
  (4, 4, NULL, 2, 'its not good');

INSERT INTO properties (owner_id, title, description, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, thumbnail_photo_url, cover_photo_url, country, street, city, province, post_code, active)
VALUES
  (1, 'Cozy Cabin', 'description', 120, 2, 1, 1, 'https://example.com/thumbnail1.jpg', 'https://example.com/cover1.jpg', 'Canada', '123 Main St', 'Vancouver', 'British Columbia', 'V6B 4K9', true),
  (2, 'Modern Condo', 'description', 150, 1, 2, 2, 'https://example.com/thumbnail2.jpg', 'https://example.com/cover2.jpg', 'Canada', '456 Elm St', 'Toronto', 'Ontario', 'M5H 2N6', true),
  (3, 'Rustic Retreat', 'description', 200, 2, 2, 3, 'https://example.com/thumbnail3.jpg', 'https://example.com/cover3.jpg', 'Canada', '789 Oak St', 'Calgary', 'Alberta', 'T2P 1J9', true),
  (4, 'Lakefront Cottage', 'description', 180, 1, 1, 1, 'https://example.com/thumbnail4.jpg', 'https://example.com/cover4.jpg', 'Canada', '10 Maple Ave', 'Montreal', 'Quebec', 'H3A 1W7', true);