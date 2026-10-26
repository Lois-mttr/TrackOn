import type { NextFunction, Request, Response } from 'express';
import { publishRealtime } from '../infrastructure/realtime.js';

const mutatingMethods = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

export function realtimeSignals(req: Request, res: Response, next: NextFunction) {
    res.once('finish', () => {
        if (!mutatingMethods.has(req.method) || res.statusCode >= 400) return;
        const resource = req.path.split('/').filter(Boolean)[1] ?? 'data';
        publishRealtime({ type: 'data.changed', resource, action: req.method.toLowerCase() });
    });
    next();
}
