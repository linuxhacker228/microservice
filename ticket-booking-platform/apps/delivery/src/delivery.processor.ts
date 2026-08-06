import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";
import  QRCode  from "qrcode";

@Processor('ticket-delivery')
export class DeliveryProcess extends WorkerHost {
    async process(job: Job<{
        orderId: string,
        seatId: string,
        userId: string,
        userEmail: string,
    }>) {
        const qrData = `ticket_order_${job.data.orderId}_seat_${job.data.seatId}`;
        const base64 = await QRCode.toDataURL(qrData);
        console.log(`Билет отправлен на почту ${job.data.userEmail}`)
        return {
            status: 'DELIVERED',
            qrCode: base64,
        }
    }
}