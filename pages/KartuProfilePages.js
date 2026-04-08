import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import KartuProfil from "../components/KartuProfil";
import { SafeAreaView } from "react-native-safe-area-context";


export default function KartuProfilePages() {
    // A. INISIALISASI STATE
    const [kodeKelas, setKodeKelas] = useState('');
    const [isHadir, setIsHadir] = useState(false);
    const [waktuAbsen, setWaktuAbsen] = useState('');
    const [jamRealtime, setJamRealtime] = useState('Memuat Jam...');

    const studentData = {
        name: 'Sheva Yudha Yunior',
        nim: '0320240078',
        prodi: 'Manajemen Informatika',
    };

    // B. FASE MOUNTING (Komponen Lahir)
    useEffect(() => {
        console.log('[MOUNTING] Aplikasi Dibuka (via useEffect). Jam menyala.');

        const intervalJam = setInterval(() => {
            const waktu = new Date().toLocaleDateString('id-ID', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            setJamRealtime(waktu);
        }, 1000);
        
        return() => {
            console.log('[UNMOUNTING] Aplikasi Ditutup. Membersihkan Interval Jam!');
            clearInterval(intervalJam);
        };
    }, []); // Kosong berarti hanya dijalankan sekali saat komponen pertama kali muncul

    // C. FASE UPDATING
    useEffect(() => {
        if (isHadir) {
            console.log(`[UPDATING] Sukses presensi pada pukul: ${waktuAbsen}`);
        }
    }, [isHadir, waktuAbsen]);

    // E. LOGIKA EVENT HANDLER
    const handleAbsen = () => {
        if (kodeKelas.trim() === '') {
            alert('Masukkan kode kelas (Simulasi QR) terlebih dahulu!');
            return;
        }

        // Ubah state menjadi hadir dan rekam jam saat itu
        setIsHadir(true);
        setWaktuAbsen(jamRealtime);
    };

    // F. FUNGSI RENDER WAJIB
    return (
        <SafeAreaView style={styles.container}>
            {/* HEADER DENGAN JAM DIGITAL (Terhubung ke State) */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Sistem Presensi</Text>
                <Text style={styles.clockText}>{jamRealtime}</Text>
            </View>

            {/* MEMANGGIL FUNCTIONAL COMPONENT DAN MENGIRIM PROPS */}
            <KartuProfil student={studentData} />

            {/* SEKSI PRESENSI (CONDITIONAL RENDERING) */}
            <View style={styles.actionSection}>
                {isHadir ? (
                    <View style={styles.successCard}>
                        <Image
                            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/190/190411.png' }}
                            style={styles.successIcon}
                        />
                        <Text style={styles.successText}>Presensi Berhasil!</Text>
                        <Text style={styles.timeText}>Tercatat pada: {waktuAbsen} WIB</Text>
                        <Text style={styles.codeText}>Kode Terverifikasi: {kodeKelas}</Text>
                    </View>
                ) : (
                        <View style={styles.inputCard}>
                            <Text style={styles.instructionText}>Masukkan Kode Kelas:</Text>
                            <Text style={styles.noteText}>(Simulasi dari hasil Scan QR Kamera)</Text>

                            <TextInput
                                style={styles.input}
                                placeholder="Contoh: TRPL-03"
                                value={kodeKelas}
                                onChangeText={setKodeKelas}
                                autoCapitalize="characters"
                            />
                            <TouchableOpacity style={styles.buttonSubmit} onPress={handleAbsen}>
                                <Text style={styles.buttonText}>Konfirmasi Kehadiran</Text>
                            </TouchableOpacity>
                        </View>
                    )}
            </View>
        </SafeAreaView>
    );
};    

const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#F4F6F9',
        },
        header: {
            backgroundColor: '#0056A0',
            paddingVertical: 20,
            alignItems: 'center',
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            marginBottom: 20,
        },
        headerTitle: {
            color: '#fff',
            fontSize: 22,
            fontWeight: 'bold',
        },
        headerSubtitle: {
            color: '#D1E8FF',
            fontSize: 14,
            marginTop: 5,
        },
        actionSection: {
            marginTop: 30,
            marginHorizontal: 20,
        },
        inputCard: {
            backgroundColor: '#fff',
            padding: 20,
            borderRadius: 12,
            elevation: 2,
        },
        instructionText: {
            fontSize: 16,
            fontWeight: '600',
            color: '#333',
            marginBottom: 5,
        },
        noteText: {
            fontSize: 12,
            color: '#888',
            marginBottom: 15,
            fontStyle: 'italic',
        },
        input: {
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 8,
            padding: 12,
            fontSize: 16,
            backgroundColor: '#FAFAFA',
            marginBottom: 20,
            color: '#333',
        },
        buttonSubmit: {
            backgroundColor: '#0056A0',
            padding: 15,
            borderRadius: 8,
            alignItems: 'center',
        },
        buttonText: {
            color: '#fff',
            fontSize: 16,
            fontWeight: 'bold',
        },
        successCard: {
            backgroundColor: '#E8F5E9',
            padding: 30,
            borderRadius: 12,
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#C8E6C9',
        },
        successIcon: {
            width: 80,
            height: 80,
            marginBottom: 15,
        },
        successText: {
            fontSize: 22,
            fontWeight: 'bold',
            color: '#2E7D32',
            marginBottom: 10,
        },
        timeText: {
            fontSize: 16,
            color: '#388E3C',
            marginBottom: 5,
        },
        codeText: {
            fontSize: 14,
            color: '#666',
            marginTop: 10,
            fontFamily: 'monospace',
        },
    }
);  