/**
 * Calculate age from a birthday string in yyyy-mm-dd format
 * @param birthday - Birthday string in yyyy-mm-dd format or null/undefined
 * @returns Age as a number, or null if birthday is invalid or missing
 */
export const calculateAgeFromBirthday = (birthday?: string | null): number | null => {
  if (!birthday) {
    return null;
  }

  try {
    const birthDate = new Date(birthday);

    // Validate that the date is valid
    if (isNaN(birthDate.getTime())) {
      return null;
    }

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  } catch {
    return null;
  }
};

/**
 * Format a birthday string into a readable date format
 * @param birthday - Birthday string in yyyy-mm-dd format or null/undefined
 * @returns Formatted date string like "January 15, 1990", or null if birthday is invalid or missing
 */
export const formatBirthday = (birthday?: string | null): string | null => {
  if (!birthday) {
    return null;
  }

  try {
    const birthDate = new Date(birthday);

    // Validate that the date is valid
    if (isNaN(birthDate.getTime())) {
      return null;
    }

    return birthDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return null;
  }
};

/**
 * Build a TMDB image URL from a profile path
 * @param profilePath - TMDB profile path like "/abc123.jpg" or null/undefined
 * @returns Full TMDB image URL or null if profilePath is missing
 */
export const buildProfileImageUrl = (profilePath?: string | null): string | null => {
  if (!profilePath) {
    return null;
  }

  return `https://image.tmdb.org/t/p/w500${profilePath}`;
};
