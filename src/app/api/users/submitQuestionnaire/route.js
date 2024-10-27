import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/user.model';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { disorders } = req.body;

  try {
    await connect();

    // Fetch the current user (You might use a token-based system or session)
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user's mental disorders without severity
    disorders.forEach((disorder) => {
      if (!user.mentalDisorders.some(d => d.disorderName === disorder.name)) {
        user.mentalDisorders.push({
          disorderName: disorder.name,
          severity: null, // Not setting severity yet
        });
      }
    });

    await user.save();

    return res.status(200).json({ message: 'Disorders updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
}
