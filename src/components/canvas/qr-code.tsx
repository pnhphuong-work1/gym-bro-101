'use client';

import React, {useRef} from 'react';
import { useQRCode } from 'next-qrcode';
import {useUserSubscriptionContext} from "@/context/SubscriptionContext";
import {useGlobalContext} from "@/context/GlobalContext";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const QRCodeDialog = ({ isOpen, qrcodeRef, onClose, subscription }) => {
    if (!isOpen) return null;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { subscriptionId } = useUserSubscriptionContext();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { userId } = useGlobalContext();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { Canvas } = useQRCode();
    const handleDownload = () => {
        //Download the <Canvas> as an image
        const canvas = qrcodeRef.current?.querySelector('canvas');
        if (!canvas) return;
        const url = canvas.toDataURL('image/png'); // 2. Convert to data URL
        const link = document.createElement('a');
        link.href = url;
        link.download = `${subscription?.name || 'qr-code'}.png`;
        link.click();
    }


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-5 rounded shadow-lg w-[30%] flex justify-center flex-col items-center">
                <h2 className="text-2xl mb-4">QR Code for
                    <strong className={""}>{" "+subscription?.name}</strong>
                </h2>
                <div
                    ref={qrcodeRef}
                >
                    <Canvas
                        text={`Subscription ID: ${subscriptionId}
                               User ID: ${userId}
                        `}
                        options={{
                            errorCorrectionLevel: 'M',
                            margin: 3,
                            scale: 4,
                            width: 200,
                            color: {
                                dark: '#010599FF',
                                light: '#FFBF60FF',
                            },
                        }}
                    />
                </div>
                <button onClick={handleDownload} className="mt-4 p-2 bg-blue-500 text-white rounded">
                    Download QR Code
                </button>
                <button onClick={onClose} className="mt-4 p-2 bg-gray-300 text-white rounded">
                    Close
                </button>
            </div>
        </div>
    );
};

export default QRCodeDialog;
