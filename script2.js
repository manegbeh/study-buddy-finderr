document.getElementById('saveProfile').addEventListener('click', () => {
  const profile = {
    name: document.getElementById('name').value,
    age: document.getElementById('age').value,
    school: document.getElementById('school').value,
    academicLevel: document.getElementById('academicLevel').value,
    subject: document.getElementById('subjects').value,
    studyFocus: document.getElementById('studyFocus').value,
    availability: document.getElementById('availability').value,
    studyTime: document.getElementById('studyTime').value,
    groupSize: document.getElementById('groupSize').value,
    learningStyle: document.getElementById('learningStyle').value,
    motivation: document.getElementById('motivation').value,
    communication: document.getElementById('communication').value,
  };

  const matches = findMatches(profile);
  displayMatches(matches);
});

function findMatches(userProfile) {
  const generateRandomProfile = (index) => {
    const ageGroup = Math.random();
    let age;

    // Weighted distribution of ages
    if (ageGroup < 0.7) {
      age = Math.floor(Math.random() * 6) + 18;  // 18-23 (70% chance)
    } else if (ageGroup < 0.9) {
      age = Math.floor(Math.random() * 8) + 23;  // 23-30 (20% chance)
    } else {
      age = Math.floor(Math.random() * 6) + 30;  // 30-35 (10% chance)
    }

    return {
      name: `Person ${index + 1}`,
      age: age,
      school: 'Goldsmiths',
      academicLevel: ['Undergraduate', 'Postgraduate'][Math.floor(Math.random() * 2)],
      subject: ['Math', 'Computer Science', 'Physics'][Math.floor(Math.random() * 3)],
      studyFocus: ['Prepare for an upcoming exam', 'Learn a new skill/topic', 'Review notes'][Math.floor(Math.random() * 3)],
      availability: ['Daily', 'Weekly', 'Weekends'][Math.floor(Math.random() * 3)],
      studyTime: ['Mornings', 'Afternoons', 'Evenings'][Math.floor(Math.random() * 3)],
      groupSize: ['1-on-1', 'Small Group', 'Large Group'][Math.floor(Math.random() * 3)],
      learningStyle: ['Visual', 'Auditory', 'Kinesthetic'][Math.floor(Math.random() * 3)],
      motivation: ['Highly Motivated', 'Moderately Motivated', 'Low Motivation'][Math.floor(Math.random() * 3)],
      communication: ['Text-based', 'Video Calls', 'In-person'][Math.floor(Math.random() * 3)],
    };
  };

  // Generate 500 profiles
  const sampleProfiles = Array.from({ length: 500 }, (_, index) => generateRandomProfile(index));

  return sampleProfiles
    .map((profile) => {
      let score = 0;

      // High-weight criteria (most important)
      if (profile.academicLevel === userProfile.academicLevel) score += 3;
      if (profile.subject === userProfile.subject) score += 3;
      if (profile.studyFocus === userProfile.studyFocus) score += 3;

      // Medium-weight criteria
      if (profile.availability === userProfile.availability) score += 2;
      if (profile.studyTime === userProfile.studyTime) score += 2;

      // Low-weight criteria
      if (profile.groupSize === userProfile.groupSize) score += 1;
      if (profile.learningStyle === userProfile.learningStyle) score += 1;
      if (profile.motivation === userProfile.motivation) score += 1;
      if (profile.communication === userProfile.communication) score += 1;

      return { ...profile, score }; // Include the score in the result
    })
    .sort((a, b) => b.score - a.score) // Sort profiles by highest score
    .filter((profile) => profile.score >= 5); // Filter out profiles with very low scores
}

function displayMatches(matches) {
  const matchesSection = document.getElementById('matches');
  const profileSetupSection = document.getElementById('profile-setup');
  const matchResults = document.getElementById('matchResults');

  profileSetupSection.style.display = 'none';
  matchesSection.style.display = 'block';

  if (matches.length === 0) {
    matchResults.innerHTML = '<p>No matches found. Try adjusting your preferences!</p>';
  } else {
    matchResults.innerHTML = matches
      .map(
        (match) => `
      <div class="match">
        <h3>${match.name}</h3>
        <p>Score: ${match.score}</p>
        <p>Age: ${match.age}</p>
        <p>School: ${match.school}</p>
        <p>Academic Level: ${match.academicLevel}</p>
        <p>Subject: ${match.subject}</p>
        <p>Study Focus: ${match.studyFocus}</p>
        <p>Availability: ${match.availability}</p>
        <p>Preferred Study Time: ${match.studyTime}</p>
        <p>Group Size: ${match.groupSize}</p>
        <p>Learning Style: ${match.learningStyle}</p>
        <p>Motivation: ${match.motivation}</p>
        <p>Communication: ${match.communication}</p>
      </div>
    `)
      .join('');
  }
}

function resetForm() {
  document.getElementById('profile-setup').style.display = 'block';
  document.getElementById('matches').style.display = 'none';
  document.getElementById('profileForm').reset();
}

