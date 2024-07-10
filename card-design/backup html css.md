<!-- //html  -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <!-- Boxicons CSS -->
    <link
      href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
      rel="stylesheet"
    />
    <title>Card Design</title>
  </head>
  <body>
    <div class="profile-card">
      <div class="image">
        <img src="profile.jpg" alt="profile" class="profile-img" />
      </div>
      <div class="text-data">
        <span class="name">CodingLab</span>
        <span class="job">Youtuber & Blogger</span>
      </div>
      <div class="media-buttons">
        <a href="#" style="background: #4267b2" class="link">
          <i class="bx bxl-facebook"></i>
        </a>
        <a href="#" style="background: #1da1f2" class="link">
          <i class="bx bxl-twitter"></i>
        </a>
        <a href="#" style="background: #e1306c" class="link">
          <i class="bx bxl-instagram"></i>
        </a>
        <a href="#" style="background: #ff0000" class="link">
          <i class="bx bxl-youtube"></i>
        </a>
      </div>
      <div class="buttons">
        <button class="button">Subscribe</button>
        <button class="button">Message</button>
      </div>
      <div class="analytics">
        <div class="data">
          <i class="bx bx-heart"></i>
          <span class="number">60k</span>
        </div>
        <div class="data">
          <i class="bx bx-message-rounded"></i>
          <span class="number">20k</span>
        </div>
        <div class="data">
          <i class="bx bx-share"></i>
          <span class="number">12k</span>
        </div>
      </div>
    </div>
  </body>
</html>

<!-- //css -->

@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

- {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
  }
  body {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f4f4f4;
  }
  .profile-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 370px;
  width: 100%;
  background-color: #fff;
  border-radius: 24px;
  padding: 25px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  }
  .profile-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 36%;
  width: 100%;
  border-radius: 24px 24px 0 0;
  background-color: #4070f4;
  }
  .image {
  position: relative;
  height: 150px;
  width: 150px;
  border-radius: 50%;
  background-color: #4070f4;
  padding: 3px;
  margin-bottom: 10px;
  }
  .image .profile-img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid #fff;
  }
  .profile-card .text-data {
  display: flex;
  flex-direction: column;
  align-items: center;
  }
  .text-data .name {
  font-size: 22px;
  font-weight: 500;
  }
  .text-data .job {
  font-size: 15px;
  font-weight: 400;
  }
  .profile-card .media-buttons {
  display: flex;
  align-items: center;
  margin-top: 15px;
  }
  .media-buttons .link {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 18px;
  height: 34px;
  width: 34px;
  border-radius: 50%;
  margin: 0 8px;
  background-color: #4070f4;
  text-decoration: none;
  }
  .profile-card .buttons {
  display: flex;
  align-items: center;
  margin-top: 25px;
  }
  .buttons .button {
  font-size: 14px;
  font-weight: 400;
  color: #fff;
  border: none;
  border-radius: 24px;
  margin: 0 10px;
  padding: 8px 24px;
  background-color: #4070f4;
  cursor: pointer;
  transition: all 0.2s;
  }
  .buttons .button:hover {
  background-color: #0e4bf1;
  }
  .profile-card .analytics {
  display: flex;
  align-items: center;
  margin-top: 25px;
  }
  .analytics .data {
  display: flex;
  align-items: center;
  color: #333;
  padding: 0 20px;
  border-right: 2px solid #e7e7e7;
  }
  .data i {
  font-size: 18px;
  margin-right: 6px;
  }
  .data:last-child {
  border-right: none;
  }
