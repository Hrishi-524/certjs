import { Request, Response } from 'express';
import { getDashboardService } from '#app/services/dashboard/dashboard.service';

export async function getDashboard(req: Request, res: Response) {
    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const dashboardData = await getDashboardService(userId, {
        activeJobsLimit: 3,
        recentJobsLimit: 3,
        recentTemplatesLimit: 3,
    });

    return res.status(200).json(dashboardData);
}