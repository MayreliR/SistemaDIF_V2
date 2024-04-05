# Generated by Django 5.0.3 on 2024-03-27 20:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sistema_dif', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='empleado',
            name='datosPersonales',
        ),
        migrations.AddField(
            model_name='empleado',
            name='apellidoMaterno',
            field=models.CharField(default='', max_length=30),
        ),
        migrations.AddField(
            model_name='empleado',
            name='apellidoPaterno',
            field=models.CharField(default='', max_length=30),
        ),
        migrations.AddField(
            model_name='empleado',
            name='nombre',
            field=models.CharField(default='', max_length=30),
        ),
    ]