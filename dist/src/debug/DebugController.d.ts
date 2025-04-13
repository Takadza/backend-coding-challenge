import { DebugService } from './services/DebugService';
import { DecryptRequest } from './domain/DecryptRequest';
export declare class DebugController {
    private readonly debugService;
    constructor(debugService: DebugService);
    decrypt(request: DecryptRequest): Promise<{
        brokenResult: string;
        fixedResult: string;
        matches: boolean;
        explanation: string;
        error?: undefined;
    } | {
        error: any;
        fixedResult: string;
        explanation: string;
        brokenResult?: undefined;
        matches?: undefined;
    }>;
}
