'use client';

import React from 'react';
import { useQRCode } from 'next-qrcode';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const QRCodeDialog = ({ isOpen, onClose, subscription }) => {
    if (!isOpen) return null;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { Canvas } = useQRCode();

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-5 rounded shadow-lg w-[30%] flex justify-center flex-col items-center">
                <h2 className="text-2xl mb-4">QR Code for {subscription?.name}</h2>
                <Canvas
                    text={'https://github.com/bunlong/next-qrcode'}
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
                <button onClick={onClose} className="mt-4 p-2 bg-blue-500 text-white rounded">
                    Close
                </button>
            </div>
        </div>
    );
};

export default QRCodeDialog;
